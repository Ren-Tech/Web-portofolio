import { useState, useEffect, useCallback, useRef } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const useSpotify = () => {
  const [token, setToken] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const intervalRef = useRef(null);

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 
    (process.env.NODE_ENV === 'production' 
      ? window.location.origin 
      : 'http://localhost:3000');
  
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-private',
    'user-read-email'
  ].join(' ');

  useEffect(() => {
    if (!CLIENT_ID) {
      console.error('Spotify Client ID is missing. Please set REACT_APP_SPOTIFY_CLIENT_ID environment variable.');
    }
  }, [CLIENT_ID]);

  const logout = useCallback(() => {
    setToken(null);
    setNowPlaying(null);
    setIsPlaying(false);
    setLoading(false);
    setError(null);
    
    window.localStorage.removeItem('spotifyToken');
    window.localStorage.removeItem('spotifyTokenTimestamp');
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    spotifyApi.setAccessToken(null);
  }, []);

  const isTokenExpired = useCallback((tokenTimestamp) => {
    const ONE_HOUR = 60 * 60 * 1000;
    return Date.now() - tokenTimestamp > ONE_HOUR;
  }, []);

  const safeApiCall = useCallback(async (apiCall, operation) => {
    try {
      return await apiCall();
    } catch (error) {
      console.error(`Spotify API error (${operation}):`, error);
      
      const spotifyError = {
        message: `Failed to ${operation}`,
        status: error.status,
        retryable: error.status >= 500 || error.status === 429
      };

      setError(spotifyError);

      if (error.status === 401) {
        logout();
      }

      return null;
    }
  }, [logout]);

  useEffect(() => {
    const initializeToken = () => {
      const hash = window.location.hash;
      let storedToken = window.localStorage.getItem('spotifyToken');
      const tokenTimestamp = window.localStorage.getItem('spotifyTokenTimestamp');

      if (!storedToken && hash) {
        const tokenMatch = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
        const expiresInMatch = hash.substring(1).split('&').find(elem => elem.startsWith('expires_in'));
        
        if (tokenMatch) {
          storedToken = tokenMatch.split('=')[1];
          const expiresIn = expiresInMatch ? parseInt(expiresInMatch.split('=')[1]) : 3600;
          
          window.localStorage.setItem('spotifyToken', storedToken);
          window.localStorage.setItem('spotifyTokenTimestamp', Date.now().toString());
          
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }

      if (storedToken && tokenTimestamp && isTokenExpired(parseInt(tokenTimestamp))) {
        console.warn('Spotify token expired');
        logout();
        return;
      }

      if (storedToken) {
        setToken(storedToken);
        spotifyApi.setAccessToken(storedToken);
      } else {
        setLoading(false);
      }
    };

    initializeToken();
  }, [isTokenExpired, logout]);

  useEffect(() => {
    if (!token) return;

    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userProfile = await safeApiCall(
          () => spotifyApi.getMe(),
          'validate token'
        );

        if (!userProfile) {
          setLoading(false);
          return;
        }

        console.log('Spotify authenticated as:', userProfile.display_name || userProfile.id);

        const playbackState = await safeApiCall(
          () => spotifyApi.getMyCurrentPlayingTrack(),
          'fetch playback state'
        );

        if (playbackState?.item) {
          setNowPlaying({
            title: playbackState.item.name,
            artist: playbackState.item.artists.map(artist => artist.name).join(', '),
            album: playbackState.item.album.name,
            albumArt: playbackState.item.album.images[0]?.url,
            progress: playbackState.progress_ms || 0,
            duration: playbackState.item.duration_ms,
            isPlaying: playbackState.is_playing,
            trackId: playbackState.item.id
          });
          setIsPlaying(playbackState.is_playing);
        }
      } catch (error) {
        console.error('Unexpected error in fetchInitialData:', error);
        setError({
          message: 'Unexpected error initializing Spotify',
          retryable: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [token, safeApiCall]);

  useEffect(() => {
    if (!token || loading) return;

    const updateNowPlaying = async () => {
      const playbackState = await safeApiCall(
        () => spotifyApi.getMyCurrentPlayingTrack(),
        'update playback state'
      );

      if (playbackState?.item) {
        setNowPlaying(prev => {
          const newState = {
            title: playbackState.item.name,
            artist: playbackState.item.artists.map(artist => artist.name).join(', '),
            album: playbackState.item.album.name,
            albumArt: playbackState.item.album.images[0]?.url,
            progress: playbackState.progress_ms || 0,
            duration: playbackState.item.duration_ms,
            isPlaying: playbackState.is_playing,
            trackId: playbackState.item.id
          };

          if (JSON.stringify(prev) === JSON.stringify(newState)) {
            return prev;
          }

          return newState;
        });
        setIsPlaying(playbackState.is_playing);
      } else if (playbackState !== null) {
        setNowPlaying(null);
        setIsPlaying(false);
      }
    };

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(updateNowPlaying, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [token, loading, safeApiCall]);

  const login = useCallback(() => {
    console.log('Spotify login initiated');
    
    if (!CLIENT_ID) {
      console.error('Spotify Client ID is missing');
      setError({
        message: 'Spotify Client ID is not configured.',
        retryable: false
      });
      return;
    }

    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
    
    console.log('Redirecting to Spotify auth...');
    window.location.href = authUrl;
  }, [CLIENT_ID, REDIRECT_URI, SCOPES]);

  const togglePlayback = async () => {
    if (!token) {
      setError({
        message: 'Not authenticated with Spotify',
        retryable: false
      });
      return;
    }

    try {
      setError(null);
      
      if (isPlaying) {
        await safeApiCall(() => spotifyApi.pause(), 'pause playback');
        if (!error) {
          setIsPlaying(false);
          setNowPlaying(prev => prev ? { ...prev, isPlaying: false } : null);
        }
      } else {
        await safeApiCall(() => spotifyApi.play(), 'start playback');
        if (!error) {
          setIsPlaying(true);
          setNowPlaying(prev => prev ? { ...prev, isPlaying: true } : null);
        }
      }
    } catch (error) {
      console.error('Unexpected error in togglePlayback:', error);
      setError({
        message: 'Unexpected error toggling playback',
        retryable: true
      });
    }
  };

  const skipToNext = async () => {
    if (!token) return;
    await safeApiCall(() => spotifyApi.skipToNext(), 'skip to next track');
  };

  const skipToPrevious = async () => {
    if (!token) return;
    await safeApiCall(() => spotifyApi.skipToPrevious(), 'skip to previous track');
  };

  const seek = async (positionMs) => {
    if (!token) return;
    await safeApiCall(() => spotifyApi.seek(positionMs), 'seek track');
    setNowPlaying(prev => prev ? { ...prev, progress: positionMs } : null);
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    token,
    nowPlaying,
    isPlaying,
    loading,
    error,
    login,
    logout,
    togglePlayback,
    skipToNext,
    skipToPrevious,
    seek,
    clearError,
    isAuthenticated: !!token
  };
};
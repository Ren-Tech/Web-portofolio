import { useState, useEffect, useCallback, useRef } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

// Create a single instance to avoid multiple instances
const spotifyApi = new SpotifyWebApi();

export const useSpotify = () => {
  const [token, setToken] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Refs for cleanup and state management
  const intervalRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Environment variables with validation
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

  // Validate environment configuration
  useEffect(() => {
    if (!CLIENT_ID) {
      console.error('Spotify Client ID is missing. Please set REACT_APP_SPOTIFY_CLIENT_ID environment variable.');
    }
  }, [CLIENT_ID]);

  const logout = useCallback(() => {
    // Clear all state
    setToken(null);
    setNowPlaying(null);
    setIsPlaying(false);
    setLoading(false);
    setError(null);
    
    // Clear storage
    window.localStorage.removeItem('spotifyToken');
    window.localStorage.removeItem('spotifyTokenTimestamp');
    
    // Clear intervals and abort requests
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Reset Spotify API
    spotifyApi.setAccessToken(null);
  }, []);

  // Token validation and expiration check
  const isTokenExpired = useCallback((tokenTimestamp) => {
    const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
    return Date.now() - tokenTimestamp > ONE_HOUR;
  }, []);

  // Safe API call wrapper with error handling
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

  // Token initialization and validation
  useEffect(() => {
    const initializeToken = () => {
      const hash = window.location.hash;
      let storedToken = window.localStorage.getItem('spotifyToken');
      const tokenTimestamp = window.localStorage.getItem('spotifyTokenTimestamp');

      // Check for token in URL (OAuth callback)
      if (!storedToken && hash) {
        const tokenMatch = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
        const expiresInMatch = hash.substring(1).split('&').find(elem => elem.startsWith('expires_in'));
        
        if (tokenMatch) {
          storedToken = tokenMatch.split('=')[1];
          const expiresIn = expiresInMatch ? parseInt(expiresInMatch.split('=')[1]) : 3600;
          
          // Store token and timestamp
          window.localStorage.setItem('spotifyToken', storedToken);
          window.localStorage.setItem('spotifyTokenTimestamp', Date.now().toString());
          
          // Clear URL hash without reloading
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }

      // Check token expiration
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

  // Fetch initial user data and current playback state
  useEffect(() => {
    if (!token) return;

    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);

      // Create abort controller for cleanup
      abortControllerRef.current = new AbortController();

      try {
        // Validate token by fetching user profile
        const userProfile = await safeApiCall(
          () => spotifyApi.getMe(),
          'validate token'
        );

        if (!userProfile) {
          setLoading(false);
          return;
        }

        console.log('Spotify authenticated as:', userProfile.display_name || userProfile.id);

        // Fetch current playback state
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
        abortControllerRef.current = null;
      }
    };

    fetchInitialData();
  }, [token, safeApiCall]);

  // Periodic updates for now playing
  useEffect(() => {
    if (!token || loading) return;

    const updateNowPlaying = async () => {
      const playbackState = await safeApiCall(
        () => spotifyApi.getMyCurrentPlayingTrack(),
        'update playback state'
      );

      if (playbackState?.item) {
        setNowPlaying(prev => {
          // Only update if something actually changed to prevent unnecessary re-renders
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

          // Simple deep comparison to avoid unnecessary state updates
          if (JSON.stringify(prev) === JSON.stringify(newState)) {
            return prev;
          }

          return newState;
        });
        setIsPlaying(playbackState.is_playing);
      } else if (playbackState !== null) { // null means API call failed
        setNowPlaying(null);
        setIsPlaying(false);
      }
    };

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval with error handling
    intervalRef.current = setInterval(updateNowPlaying, 5000);

    // Cleanup on unmount or dependency change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [token, loading, safeApiCall]);

  const login = useCallback((e) => {
    // Prevent default behavior and stop propagation
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!CLIENT_ID) {
      setError({
        message: 'Spotify Client ID is not configured. Please check your environment variables.',
        retryable: false
      });
      return;
    }

    // For production, ensure redirect URI matches exactly what's in Spotify Dashboard
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
        if (!error) { // Only update state if API call succeeded
          setIsPlaying(false);
          setNowPlaying(prev => prev ? { ...prev, isPlaying: false } : null);
        }
      } else {
        await safeApiCall(() => spotifyApi.play(), 'start playback');
        if (!error) { // Only update state if API call succeeded
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

    // Optimistically update progress locally
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
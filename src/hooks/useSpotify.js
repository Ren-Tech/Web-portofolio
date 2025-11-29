 import { useState, useEffect, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const useSpotify = () => {
  const [token, setToken] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use environment variables with fallbacks
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-private',
    'user-read-email'
  ].join(' ');

  const logout = useCallback(() => {
    setToken(null);
    setNowPlaying(null);
    setIsPlaying(false);
    setLoading(false);
    setError(null);
    window.localStorage.removeItem('spotifyToken');
    spotifyApi.setAccessToken(null);
  }, []);

  // Check for token in URL on component mount
  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem('spotifyToken');

    if (!storedToken && hash) {
      const tokenMatch = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
      if (tokenMatch) {
        storedToken = tokenMatch.split('=')[1];
        
        // Clear URL hash
        window.location.hash = '';
        window.localStorage.setItem('spotifyToken', storedToken);
      }
    }

    if (storedToken) {
      setToken(storedToken);
      spotifyApi.setAccessToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []); // Empty dependency array is safe here

  // Validate token and fetch initial data
  useEffect(() => {
    if (!token) return;

    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Test token validity by making a simple API call
        const userProfile = await spotifyApi.getMe();
        console.log('Logged in as:', userProfile.display_name || userProfile.id);

        const response = await spotifyApi.getMyCurrentPlayingTrack();
        
        if (response.item) {
          setNowPlaying({
            title: response.item.name,
            artist: response.item.artists.map(artist => artist.name).join(', '),
            album: response.item.album.name,
            albumArt: response.item.album.images[0]?.url,
            progress: response.progress_ms,
            duration: response.item.duration_ms,
            isPlaying: response.is_playing,
            trackId: response.item.id
          });
          setIsPlaying(response.is_playing);
        } else {
          setNowPlaying(null);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Failed to fetch Spotify data');
        
        if (error.status === 401) {
          // Token is invalid, logout
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [token, logout]); // Added logout to dependencies

  // Separate effect for periodic updates - no loading state
  useEffect(() => {
    if (!token || loading) return;

    const updateNowPlaying = async () => {
      try {
        const response = await spotifyApi.getMyCurrentPlayingTrack();
        
        if (response.item) {
          setNowPlaying(prev => ({
            title: response.item.name,
            artist: response.item.artists.map(artist => artist.name).join(', '),
            album: response.item.album.name,
            albumArt: response.item.album.images[0]?.url,
            progress: response.progress_ms,
            duration: response.item.duration_ms,
            isPlaying: response.is_playing,
            trackId: response.item.id
          }));
          setIsPlaying(response.is_playing);
        } else {
          setNowPlaying(null);
          setIsPlaying(false);
        }
      } catch (error) {
        console.error('Error updating now playing:', error);
        if (error.status === 401) {
          logout();
        }
      }
    };

    // Update every 5 seconds without showing loading state
    const interval = setInterval(updateNowPlaying, 5000);
    return () => clearInterval(interval);
  }, [token, loading, logout]); // Added logout to dependencies

  const login = useCallback(() => {
    if (!CLIENT_ID) {
      setError('Spotify Client ID is not configured. Please check your environment variables.');
      return;
    }

    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
    window.location.href = authUrl;
  }, [CLIENT_ID, REDIRECT_URI, SCOPES]);

  const togglePlayback = async () => {
    if (!token) {
      setError('Not authenticated');
      return;
    }

    try {
      setError(null);
      
      if (isPlaying) {
        await spotifyApi.pause();
        setIsPlaying(false);
        setNowPlaying(prev => prev ? { ...prev, isPlaying: false } : null);
      } else {
        await spotifyApi.play();
        setIsPlaying(true);
        setNowPlaying(prev => prev ? { ...prev, isPlaying: true } : null);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      setError('Failed to toggle playback');
      
      if (error.status === 401) {
        logout();
      }
    }
  };

  const skipToNext = async () => {
    if (!token) return;

    try {
      setError(null);
      await spotifyApi.skipToNext();
      
      // Wait a moment then update the current track
      setTimeout(() => {
        // The periodic update will pick up the new track
      }, 1000);
    } catch (error) {
      console.error('Error skipping to next:', error);
      setError('Failed to skip track');
    }
  };

  const skipToPrevious = async () => {
    if (!token) return;

    try {
      setError(null);
      await spotifyApi.skipToPrevious();
      
      // Wait a moment then update the current track
      setTimeout(() => {
        // The periodic update will pick up the new track
      }, 1000);
    } catch (error) {
      console.error('Error skipping to previous:', error);
      setError('Failed to skip track');
    }
  };

  const seek = async (positionMs) => {
    if (!token) return;

    try {
      setError(null);
      await spotifyApi.seek(positionMs);
      
      // Update progress locally
      setNowPlaying(prev => prev ? { ...prev, progress: positionMs } : null);
    } catch (error) {
      console.error('Error seeking:', error);
      setError('Failed to seek');
    }
  };

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
    isAuthenticated: !!token
  };
};
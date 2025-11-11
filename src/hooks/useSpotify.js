import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export const useSpotify = () => {
  const [token, setToken] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use your actual Client ID here
  const CLIENT_ID = 'd5d4dcf9dcc0492c81b44fa12dde4525';
  const REDIRECT_URI = 'http://localhost:5000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state'
  ];

  // Check for token in URL on component mount
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('spotifyToken');

    if (!token && hash) {
      const tokenMatch = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
      if (tokenMatch) {
        token = tokenMatch.split('=')[1];
        window.location.hash = '';
        window.localStorage.setItem('spotifyToken', token);
      }
    }

    if (token) {
      setToken(token);
      spotifyApi.setAccessToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Initial fetch - show loading only for first load
  useEffect(() => {
    if (!token) return;

    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await spotifyApi.getMyCurrentPlayingTrack();
        
        if (response.item) {
          setNowPlaying({
            title: response.item.name,
            artist: response.item.artists.map(artist => artist.name).join(', '),
            album: response.item.album.name,
            albumArt: response.item.album.images[0]?.url,
            progress: response.progress_ms,
            duration: response.item.duration_ms,
            isPlaying: response.is_playing
          });
          setIsPlaying(response.is_playing);
        } else {
          setNowPlaying(null);
        }
      } catch (error) {
        console.error('Error fetching now playing:', error);
        if (error.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [token]);

  // Separate effect for periodic updates - no loading state
  useEffect(() => {
    if (!token || loading) return;

    const updateNowPlaying = async () => {
      try {
        const response = await spotifyApi.getMyCurrentPlayingTrack();
        
        if (response.item) {
          setNowPlaying({
            title: response.item.name,
            artist: response.item.artists.map(artist => artist.name).join(', '),
            album: response.item.album.name,
            albumArt: response.item.album.images[0]?.url,
            progress: response.progress_ms,
            duration: response.item.duration_ms,
            isPlaying: response.is_playing
          });
          setIsPlaying(response.is_playing);
        } else {
          setNowPlaying(null);
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
  }, [token, loading]);

  const login = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
    window.location.href = authUrl;
  };

  const logout = () => {
    setToken(null);
    setNowPlaying(null);
    setLoading(false);
    window.localStorage.removeItem('spotifyToken');
  };

  const togglePlayback = async () => {
    if (!token) return;

    try {
      if (isPlaying) {
        await spotifyApi.pause();
        setIsPlaying(false);
      } else {
        await spotifyApi.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  return {
    token,
    nowPlaying,
    isPlaying,
    loading,
    login,
    logout,
    togglePlayback
  };
};
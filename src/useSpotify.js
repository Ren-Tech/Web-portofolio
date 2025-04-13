import { useEffect, useState } from "react";
import axios from "axios";

const CLIENT_ID = "0eb0803f368e4a15867d20230781e7d9"; // Replace with your Spotify client ID
const REDIRECT_URI = "http://localhost:3000"; // Replace with your redirect URI
const SCOPES = "user-read-currently-playing user-read-playback-state"; // Adjust scopes as needed

const useSpotify = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(3600); // Default token expiry time

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
    window.location.href = authUrl; // Redirect to Spotify login
  };

  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenInfo = new URLSearchParams(hash.replace("#", "?"));
      const token = tokenInfo.get("access_token");
      const refresh = tokenInfo.get("refresh_token");
      const expires = tokenInfo.get("expires_in");

      if (token) {
        setAccessToken(token);
        setRefreshToken(refresh);
        setExpiresIn(expires);
        window.history.pushState("", document.title, window.location.pathname); // Clear the hash
      }
    }
  }, []);

  return { accessToken, handleLogin, handleLogout };
};

export default useSpotify;

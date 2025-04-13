import React, { useEffect, useState } from "react";
import axios from "axios";
import useSpotify from "./useSpotify";

const CurrentlyPlaying = () => {
  const { accessToken, handleLogin } = useSpotify();
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchCurrentSong = async () => {
      if (!accessToken) return; // Exit if no token

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data && response.data.item) {
          setCurrentSong({
            title: response.data.item.name,
            artist: response.data.item.artists
              .map((artist) => artist.name)
              .join(", "),
          });
        } else {
          setCurrentSong(null); // No song playing
        }
      } catch (error) {
        console.error("Error fetching currently playing song:", error);
      }
    };

    fetchCurrentSong();
  }, [accessToken]);

  return (
    <div>
      {!accessToken ? (
        <button onClick={handleLogin}>Login to Spotify</button>
      ) : (
        <div>
          {currentSong ? (
            <div>
              <h2>Now Playing:</h2>
              <p>{currentSong.title}</p>
              <p>{currentSong.artist}</p>
            </div>
          ) : (
            <p>No song playing or loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentlyPlaying;

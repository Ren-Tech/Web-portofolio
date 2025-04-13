// const express = require("express");
// const axios = require("axios");
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Your Spotify credentials
// const clientId = "your-client-id";
// const clientSecret = "your-client-secret";

// // Middleware to handle CORS and JSON responses
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// // Route to get Spotify access token
// app.get("/spotify-token", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       new URLSearchParams({
//         grant_type: "client_credentials",
//       }),
//       {
//         headers: {
//           Authorization: `Basic ${Buffer.from(
//             `${clientId}:${clientSecret}`
//           ).toString("base64")}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     res.json({ accessToken: response.data.access_token });
//   } catch (error) {
//     console.error("Error fetching Spotify access token:", error);
//     res.status(500).json({ error: "Failed to get access token" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

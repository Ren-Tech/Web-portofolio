import { useEffect, useState } from "react";
import pogiImage from "../assets/pogi.png";
import { motion } from "framer-motion";

// Icons remain the same as before
const EmailIcon = ({ size = 48, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GithubIcon = ({ size = 48, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 48, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const SpotifyIcon = ({ size = 48, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "A passionate Mobile and Web Developer",
    "A passionate Mobile Application Developer",
    "A passionate Web Application Developer",
  ];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetween = 2000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    // Typing effect
    const typingTimer = setTimeout(
      () => {
        const currentText = texts[typingIndex % texts.length];

        if (isDeleting) {
          setTypingText(currentText.substring(0, typingText.length - 1));
          if (typingText === "") {
            setIsDeleting(false);
            setTypingIndex((prevIndex) => prevIndex + 1);
          }
        } else {
          setTypingText(currentText.substring(0, typingText.length + 1));
          if (typingText === currentText) {
            setTimeout(() => setIsDeleting(true), pauseBetween);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    // Fetch Spotify now playing data
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify");
        const data = await response.json();

        if (data.isPlaying) {
          setNowPlaying(data);
        } else {
          setNowPlaying(null);
        }
      } catch (err) {
        setError("Couldn't fetch Spotify data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => {
      clearTimeout(timer);
      clearTimeout(typingTimer);
      clearInterval(interval);
    };
  }, [typingText, typingIndex, isDeleting]);

  return (
    <section className="min-h-screen bg-[#111827] flex flex-col md:flex-row justify-center items-center px-4 md:px-16 relative overflow-hidden">
      {/* Spotify Now Playing Widget */}
      <motion.div
        className="hidden md:block absolute top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-md max-w-xs"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <SpotifyIcon size={24} className="text-green-500" />
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : nowPlaying ? (
          <a
            href={nowPlaying.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={nowPlaying.albumImageUrl}
              alt={nowPlaying.album}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{nowPlaying.title}</div>
              <div className="text-sm text-gray-400 truncate">
                {nowPlaying.artist}
              </div>
              <div className="flex items-center mt-1">
                <SpotifyIcon size={16} className="text-green-500 mr-1" />
                <span className="text-xs text-gray-400">Now Playing</span>
              </div>
            </div>
          </a>
        ) : (
          <div className="flex items-center space-x-2">
            <SpotifyIcon size={24} className="text-green-500" />
            <span>Not Playing</span>
          </div>
        )}
      </motion.div>

      {/* Content Container */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 z-10">
        {/* Image */}
        <div
          className={`order-first md:order-none w-full md:w-1/2 flex justify-center transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={pogiImage}
            alt="Clarence"
            className="rounded-lg shadow-lg w-full max-w-xs md:max-w-md md:w-3/4 h-auto object-cover hover:shadow-xl transition-shadow duration-300 mb-8 md:mb-0"
          />
        </div>

        {/* Left Side - Icons and Text */}
        <div className="flex flex-col md:flex-row items-center w-full md:w-1/2">
          {/* Icons */}
          <div
            className={`flex md:flex-col space-x-6 md:space-x-0 md:space-y-6 md:mr-6 mb-4 md:mb-0 transition-opacity duration-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <a
              href="mailto:clarence11soriano@gmail.com"
              className="text-white hover:text-blue-600 transition duration-300"
            >
              <EmailIcon size={32} className="md:size-[48px]" />
            </a>
            <a
              href="https://github.com/Ren-Tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600 transition duration-300"
            >
              <GithubIcon size={32} className="md:size-[48px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/yourusername/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600 transition duration-300"
            >
              <LinkedinIcon size={32} className="md:size-[48px]" />
            </a>
          </div>

          {/* Line Divider */}
          <div
            className={`hidden md:block w-1 h-48 bg-gray-600 opacity-50 mr-6 transition-opacity duration-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Text Content */}
          <div
            className={`text-center md:text-left transition-opacity duration-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
              Hi, I'm Clarence
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-amber-500 font-semibold h-8">
              {typingText}
              <span className="animate-pulse">|</span>
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-block px-6 md:px-10 py-3 md:py-4 bg-blue-600 text-white rounded-lg transition duration-300 ease-in-out text-base md:text-lg text-center hover:bg-blue-700 hover:scale-105 transform"
              >
                See My Work
              </a>
              <a
                href="#contact"
                className="inline-block px-6 md:px-10 py-3 md:py-4 border-2 border-white text-white rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-blue-600 text-base md:text-lg text-center"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

import React, { useEffect, useState } from "react";

// Custom SVG icons as replacements for react-icons
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

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen bg-[#111827] flex flex-col md:flex-row justify-center items-center px-4 md:px-16 relative">
      {/* Sticky Spotify Song Info - Hidden on mobile */}
      <div className="hidden md:block absolute top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-md"></div>

      {/* Content Container - Stacked vertically on mobile */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0">
        {/* Image - Show first on mobile, right side on desktop */}
        <div
          className={`order-first md:order-none w-full md:w-1/2 flex justify-center transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src="/pogi.png"
            alt="Clarence"
            className="rounded-lg shadow-lg w-full max-w-xs md:max-w-md md:w-3/4 h-auto object-cover hover:shadow-xl transition-shadow duration-300 mb-8 md:mb-0"
          />
        </div>

        {/* Left Side - Icons and Text */}
        <div className="flex flex-col md:flex-row items-center w-full md:w-1/2">
          {/* Icons - Horizontal on mobile, vertical on desktop */}
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

          {/* Line Divider - Hidden on mobile */}
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
            <p className="text-xl md:text-2xl mb-6 text-gray-300">
              <span className="text-amber-500 font-semibold">
                A passionate Mobile and Web Application Developer
              </span>
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

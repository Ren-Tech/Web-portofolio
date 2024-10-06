import React, { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa"; // Import icons
import myImage from "../assets/guts.png"; // Replace with the correct image path

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100); // Delay before fade-in

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <section className="h-screen bg-[#111827] flex justify-between items-center px-16 relative">
      {/* Sticky Spotify Song Info */}
      <div className="absolute top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-md"></div>

      {/* Left side: Text with fade-in effect and line divider */}
      <div className="flex items-center w-1/2">
        {/* Icons - Vertically aligned without rounded background */}
        <div
          className={`flex flex-col space-y-6 mr-6 transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href="mailto:your-email@example.com"
            className="text-white hover:text-blue-600 transition duration-300"
          >
            <FaEnvelope size={48} /> {/* Increased icon size */}
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition duration-300"
          >
            <FaGithub size={48} /> {/* Increased icon size */}
          </a>
          <a
            href="https://www.linkedin.com/in/yourusername/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition duration-300"
          >
            <FaLinkedin size={48} /> {/* Increased icon size */}
          </a>
        </div>

        {/* Line Divider */}
        <div
          className={`w-1 h-48 bg-gray-600 opacity-50 mr-6 transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-6xl font-bold text-white">Hi, I'm Clarence</h1>{" "}
          {/* Increased text size */}
          <p className="text-2xl mt-4 text-gray-300">
            <span className="text-amber-500 font-semibold">
              A passionate Mobile and Web Application Developer
            </span>
          </p>
          <div className="mt-6 flex space-x-4">
            {/* See My Work Button */}
            <a
              href="#projects"
              className="inline-block px-10 py-4 bg-blue-600 text-white rounded-lg transition duration-300 ease-in-out text-lg"
            >
              See My Work
            </a>

            {/* Contact Me Button with Outline */}
            <a
              href="#contact"
              className="inline-block px-10 py-4 border-2 border-white text-white rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-blue-600 text-lg"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Right side: Image with fade-in effect */}
      <div
        className={`w-1/2 flex justify-center transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={myImage}
          alt="Clarence"
          className="rounded-lg shadow-lg w-3/4 h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default Home;

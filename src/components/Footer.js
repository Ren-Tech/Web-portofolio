import React from "react";
import footerImage from "../assets/berserk.png"; // Ensure the image is imported
import { FaReact } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111827] py-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side with image */}
        <div className="w-1/6 animate-fadeInLeftPartial">
          <img
            src={footerImage}
            alt="Footer"
            className="w-16 h-auto" // Adjust width as needed
          />
        </div>

        {/* Center text */}
        <div className="text-center animate-fadeInBottomPartial">
          <h3 className="text-1xl font-bold mb-2 text-white font-oswald">
            Website powered by:
          </h3>
          <div className="flex items-center justify-center space-x-4">
            <FaReact className="text-white w-10 h-10" />{" "}
            {/* Increased icon size */}
            <p className="text-white text-2xl font-oswald">React</p>{" "}
            {/* Using Oswald font */}
          </div>
        </div>

        {/* Right-aligned copyright text */}
        <p className="w-3/3 mt-4 text-white text-right animate-fadeInRightPartial font-oswald">
          &copy; 2024 Guts. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import footerImage from "../assets/portfolio-logo.png"; // Ensure the image is imported
import { SiVercel } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#111827] py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left side with image */}
        <div className="w-1/6 mb-4 md:mb-0 animate-fadeInLeftPartial">
          <img
            src={footerImage}
            alt="Footer"
            className="w-16 h-auto mx-auto md:mx-0" // Adjust width and center for mobile
          />
        </div>

        {/* Center text */}
        <div className="text-center animate-fadeInBottomPartial mb-4 md:mb-0">
          <h3 className="text-1xl font-bold mb-2 text-white font-oswald">
            Website powered by:
          </h3>
          <div className="flex items-center justify-center space-x-4">
            <SiVercel className="text-white w-10 h-10" />
            <p className="text-white text-2xl font-oswald">Vercel</p>
          </div>
        </div>

        {/* Right-aligned copyright text */}
        <p className="w-full md:w-auto mt-4 md:mt-0 text-white text-center md:text-right animate-fadeInRightPartial font-oswald">
          &copy; 2026 Clarence. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

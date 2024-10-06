import React from "react";
import footerImage from "../assets/berserk.png"; // Ensure the image is imported

const Footer = () => {
  return (
    <footer className="bg-[#111827] py-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side with image */}
        <div className="w-1/4">
          <img
            src={footerImage}
            alt="Footer"
            className="w-16 h-auto" // Adjust width as needed
          />
        </div>
        {/* Left-aligned text */}
        <div className="w-1/2 text-center">
          <h3 className="text-xl font-bold mb-2 text-white text-center">
            Stay Connected
          </h3>
          <p className="mb-4 text-white text-center">
            Follow us on social media and stay updated with the latest news and
            projects.
          </p>
        </div>

        <p className="mt-4 text-white">
          &copy; 2024 Guts. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

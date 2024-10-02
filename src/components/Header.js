import React from "react";
import logo from "../assets/berserk.jpg";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo or Image on the Left */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-12" />{" "}
          {/* Adjust the height and width as needed */}
        </div>

        {/* Navigation Links on the Right */}
        <nav className="flex space-x-8">
          <a href="#home" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#skills" className="text-gray-700 hover:text-blue-600">
            Skills
          </a>
          <a href="#tools" className="text-gray-700 hover:text-blue-600">
            Tools
          </a>
          <a href="#projects" className="text-gray-700 hover:text-blue-600">
            Projects
          </a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

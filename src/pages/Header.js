import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "../assets/berserk.jpg";

const Header = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <header className="fixed top-0 w-full bg-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-12" />
        </div>

        <button
          onClick={toggleTheme}
          className="flex items-center p-2 rounded hover:bg-gray-200 focus:outline-none"
        >
          {isLightTheme ? (
            <FaSun className="text-yellow-500 text-2xl" />
          ) : (
            <FaMoon className="text-gray-800 text-2xl" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;

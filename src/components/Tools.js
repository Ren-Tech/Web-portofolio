import React from "react";
import { FaGitAlt, FaGithub } from "react-icons/fa";
import {
  SiVisualstudiocode,
  SiFigma,
  SiPostman,
  SiCanva,
  SiArduino,
  SiAdobexd,
  SiAndroidstudio,
} from "react-icons/si";
import { IoTerminal } from "react-icons/io5";

// Define the tools with their corresponding background colors
const tools = [
  { name: "Git", icon: <FaGitAlt className="text-red-600" /> },
  { name: "GitHub", icon: <FaGithub className="text-gray-500" /> },
  { name: "VSCode", icon: <SiVisualstudiocode className="text-blue-600" /> },
  { name: "Figma", icon: <SiFigma className="text-purple-600" /> },
  { name: "Canva", icon: <SiCanva className="text-blue-400" /> },
  {
    name: "Android Studio",
    icon: <SiAndroidstudio className="text-green-600" />,
  },
  { name: "Adobe XD", icon: <SiAdobexd className="text-pink-600" /> },
  { name: "Arduino", icon: <SiArduino className="text-teal-600" /> },
  { name: "Postman", icon: <SiPostman className="text-orange-600" /> },
  { name: "Terminal", icon: <IoTerminal className="text-gray-500" /> },
];

const Tools = () => {
  return (
    <section id="tools" className="bg-[#111827] py-16 px-4 md:px-16">
      <div className="text-center mb-8"></div>

      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Left side with tools text */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl md:text-5xl font-bold font-oswald text-amber-500">
            Tools
          </h2>
          <p className="text-base md:text-lg font-bold text-white mt-4 font-oswald">
            Applications that are used to build, run, test, and deploy a
            website. These are used to cast magic spells and start all of the
            cooking.
          </p>
        </div>

        {/* Right side with tools icons */}
        <div className="w-full md:w-1/2 flex flex-wrap">
          {tools.map((tool, index) => (
            <div key={index} className="m-4 flex flex-col items-center">
              {/* Icon with color */}
              <div className="text-6xl transition-transform duration-300 transform hover:scale-125">
                {tool.icon}
              </div>
              <p className="mt-2 text-lg text-gray-300 font-oswald">
                {tool.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;

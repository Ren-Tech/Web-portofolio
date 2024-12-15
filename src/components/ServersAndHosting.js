import React from "react";
import { SiHostinger } from "react-icons/si";
import { PiInfinityBold } from "react-icons/pi";
import { IoLogoFirebase } from "react-icons/io5";

const tools = [
  { name: "Firebase", icon: <IoLogoFirebase className="text-yellow-400" /> },
  { name: "Hostinger", icon: <SiHostinger className="text-purple-600" /> },
  {
    name: "InfinityFree",
    icon: <PiInfinityBold className="text-purple-600" />,
  },
];

const ServersAndHosting = () => {
  return (
    <section
      id="servers-and-hosting"
      className="bg-[#111827] py-16 px-4 md:px-16"
    >
      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Left Side - Description */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl md:text-5xl font-bold font-oswald text-amber-500">
            Server & Hosting Services
          </h2>
          <p className="text-base md:text-lg font-bold text-white mt-4 font-oswald">
            These are the Operating Systems, Applications, and Web Services used
            to host a website and make it accessible on the internet.
          </p>
        </div>

        {/* Right Side - Tools */}
        <div className="w-full md:w-1/2 flex flex-wrap">
          {tools.map((tool, index) => (
            <div key={index} className="m-4 flex flex-col items-center">
              <div className="text-6xl text-gray-800 transition-transform duration-300 transform hover:scale-125">
                {tool.icon}
              </div>
              <p className="mt-2 text-lg text-white font-oswald">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServersAndHosting;

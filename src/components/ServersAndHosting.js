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
    <section id="servers-and-hosting" className="bg-[#111827] py-16">
      <div className="text-center mb-8"></div>

      <div className="flex justify-between items-start mx-16">
        <div className="w-1/2 pr-8">
          <h2 className="text-2xl font-bold text-white">
            Server & Hosting Services
          </h2>
          <p className="text-lg text-white mt-4">
            In modern web development, hosting and managing server
            infrastructures is critical to ensuring that your application is
            accessible, reliable, and scalable. Popular services include cloud
            providers, container management, and deployment platforms.
          </p>
        </div>

        <div className="w-1/2 flex flex-wrap">
          {tools.map((tool, index) => (
            <div key={index} className="m-4 flex flex-col items-center">
              <div className="text-6xl text-gray-800 transition-transform duration-300 transform hover:scale-125">
                {tool.icon}
              </div>

              <p className="mt-2 text-lg text-white">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServersAndHosting;

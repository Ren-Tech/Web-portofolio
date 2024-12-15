import React from "react";
import { FaNodeJs, FaPhp } from "react-icons/fa";
import { SiMysql, SiCplusplus } from "react-icons/si";

const backendSkills = [
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "PHP", icon: <FaPhp className="text-blue-600" /> },
  { name: "MySQL", icon: <SiMysql className="text-orange-600" /> },
  { name: "C++", icon: <SiCplusplus className="text-purple-600" /> },
];

const Backend = () => {
  return (
    <section id="backend" className="bg-[#111827] py-16 px-4 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Left Side - Description */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl md:text-5xl font-bold font-oswald text-amber-500">
            Backend
          </h2>
          <p className="text-base md:text-lg font-bold text-white mt-4 font-oswald">
            Programming languages and frameworks that focus on the part of a
            website that users can't directly see. It handles all of the
            server-side logic such as storing of data, user authentication, file
            storage, and more. APIs are also written at the backend.
          </p>
        </div>

        {/* Right Side - Skills */}
        <div className="w-full md:w-1/2 flex flex-wrap">
          {backendSkills.map((skill, index) => (
            <div key={index} className="m-4 flex flex-col items-center">
              <div className="text-6xl text-gray-800 transition-transform duration-300 transform hover:scale-125">
                {skill.icon}
              </div>
              <p className="mt-2 text-lg text-white font-oswald">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Backend;

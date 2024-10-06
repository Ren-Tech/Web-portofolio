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
    <section id="backend" className="bg-[#111827] py-16">
      <div className="flex justify-between items-start mx-16">
        <div className="w-1/2 pr-8">
          <h2 className="text-2xl font-bold text-white">Backend</h2>
          <p className="text-lg text-white mt-4">
            The back-end manages all the logic, databases, and server-side
            interactions needed to power dynamic applications.
          </p>
        </div>

        <div className="w-1/2 flex flex-wrap">
          {backendSkills.map((skill, index) => (
            <div key={index} className="m-4 flex flex-col items-center">
              <div className="text-6xl text-gray-800 transition-transform duration-300 transform hover:scale-125">
                {skill.icon}
              </div>
              <p className="mt-2 text-lg text-white">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Backend;

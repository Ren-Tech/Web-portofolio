import React from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaCogs } from "react-icons/fa";
import { SiFlutter, SiDart } from "react-icons/si";

const frontendSkills = [
  { name: "Flutter", icon: <SiFlutter className="text-blue-600" /> },
  { name: "Dart", icon: <SiDart className="text-blue-600" /> },
  { name: "HTML", icon: <FaHtml5 className="text-orange-600" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-yellow-400" /> },
];

const Frontend = () => {
  return (
    <section id="frontend" className="bg-[#111827]">
      <div className="text-center mb-8">
        <FaCogs className="inline-block text-4xl text-blue-600 mb-2" />
        <h1 className="text-4xl font-bold text-white">The Technicalities</h1>
        <p className="text-lg text-white mt-2">
          List of skills, tools, and tech stacks I use
        </p>
      </div>

      <div className="flex justify-between items-start mx-16">
        <div className="w-1/2 pr-8">
          <h2 className="text-2xl font-bold text-white">Front-end</h2>
          <p className="text-lg text-white mt-4">
            Programming languages, markup languages, and frameworks used to
            create visual elements of a website that users can interact with.
          </p>
        </div>

        <div className="w-1/2 flex flex-wrap ">
          {frontendSkills.map((skill, index) => (
            <div key={index} className="m-4 flex flex-col items-center">
              <div className="text-6xl transition-transform duration-300 transform hover:scale-125">
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

export default Frontend;

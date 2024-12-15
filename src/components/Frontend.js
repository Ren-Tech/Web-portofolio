import React from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaJsSquare } from "react-icons/fa";
import { SiTailwindcss, SiFlutter, SiDart } from "react-icons/si";

const frontendSkills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-600" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-600" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-yellow-500" /> },
  { name: "Flutter", icon: <SiFlutter className="text-blue-600" /> },
  { name: "Dart", icon: <SiDart className="text-blue-600" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
];

const Frontend = () => {
  return (
    <section id="frontend" className="bg-[#111827] py-16 px-4 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Left Side - Description */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-3xl md:text-5xl font-bold font-oswald text-amber-500">
            Frontend
          </h2>
          <p className="text-base md:text-lg font-bold text-white mt-4 font-oswald">
            Programming languages, markup languages, and frameworks used to
            create visual elements of a website that users can interact with.
          </p>
        </div>

        {/* Right Side - Skills */}
        <div className="w-full md:w-1/2 flex flex-wrap ">
          {frontendSkills.map((skill, index) => (
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

export default Frontend;

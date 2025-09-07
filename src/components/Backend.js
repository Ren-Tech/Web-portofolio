import React from "react";
import { FaNodeJs, FaPhp } from "react-icons/fa";
import { SiMysql, SiCplusplus, SiFirebase, SiExpress } from "react-icons/si";
import { TbApi } from "react-icons/tb";

const backendSkills = [
  { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
  { name: "PHP", icon: <FaPhp />, color: "text-blue-500" },
  { name: "MySQL", icon: <SiMysql />, color: "text-orange-400" },
  { name: "C++", icon: <SiCplusplus />, color: "text-purple-500" },
  { name: "Firebase", icon: <SiFirebase />, color: "text-amber-400" },
  { name: "REST API", icon: <TbApi />, color: "text-blue-400" },
];

const Backend = () => {
  return (
    <section
      id="backend"
      className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Matches Frontend */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4">
            Backend Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Server-side technologies that power applications behind the scenes
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Left Side - Description (same layout as Frontend) */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-amber-500/10 transition-shadow duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-400 mb-6">
                Backend Expertise
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                I build robust server-side systems that handle data processing,
                authentication, and business logic. My backend solutions ensure
                scalability, security, and seamless integration with frontend
                interfaces.
              </p>
              <div className="mt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm text-gray-400">
                    Currently expanding my backend knowledge
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Skills (identical grid layout to Frontend) */}
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {backendSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-amber-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 flex flex-col items-center"
                >
                  <div
                    className={`text-5xl mb-3 ${skill.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {React.cloneElement(skill.icon, {
                      className: "w-full h-full",
                    })}
                  </div>
                  <p className="text-lg font-medium text-white mt-2">
                    {skill.name}
                  </p>
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-amber-400/20 pointer-events-none transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Matching decorative divider */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default Backend;

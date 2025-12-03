import React from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaJsSquare } from "react-icons/fa";
import { SiTailwindcss, SiFlutter, SiDart } from "react-icons/si";

const frontendSkills = [
  { name: "HTML5", icon: <FaHtml5 />, color: "text-orange-600" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "text-blue-600" },
  { name: "JavaScript", icon: <FaJsSquare />, color: "text-yellow-500" },
  { name: "Flutter", icon: <SiFlutter />, color: "text-blue-400" },
  { name: "Dart", icon: <SiDart />, color: "text-blue-500" },
  { name: "React", icon: <FaReact />, color: "text-cyan-400" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-teal-400" },
];

const Frontend = () => {
  return (
    <section
      id="frontend"
      className="relative overflow-hidden bg-gradient-to-b from-[#111827] to-[#0f172a] py-20 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Background decorative blobs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4">
            My Development Toolkit
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Technologies I use to bring ideas to life
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Left Side - Description */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl hover:shadow-amber-500/10 transition-shadow duration-300">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-400 mb-6">
                Frontend Expertise
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in creating responsive, interactive user interfaces
                using modern web technologies. My toolkit includes everything
                from foundational markup languages to powerful frameworks that
                enable rich user experiences across all devices.
              </p>
              <div className="mt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm text-gray-400">
                    Currently learning new frameworks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Skills */}
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {frontendSkills.map((skill, index) => (
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

        {/* Decorative line */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default Frontend;

import React from "react";

const skills = ["JavaScript", "React", "Node.js", "HTML", "CSS", "Tailwind"];

const Skills = () => {
  return (
    <section id="skills" className="bg-white py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800">Skills</h2>
      <div className="flex flex-wrap justify-center mt-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="m-4 px-6 py-3 bg-gray-200 rounded-lg shadow-md"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

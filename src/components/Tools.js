import React from "react";

const tools = ["Git", "GitHub", "VSCode", "Figma", "Docker"];

const Tools = () => {
  return (
    <section id="tools" className="bg-gray-100 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800">Tools</h2>
      <div className="flex flex-wrap justify-center mt-8">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="m-4 px-6 py-3 bg-gray-200 rounded-lg shadow-md"
          >
            {tool}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;

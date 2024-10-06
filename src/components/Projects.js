import React from "react";

const projects = [
  {
    title: "Project One",
    description: "A cool project that does X.",
    link: "https://github.com/project-one",
  },
  {
    title: "Project Two",
    description: "Another cool project that does Y.",
    link: "https://github.com/project-two",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="bg-[#111827] py-16">
      <h2 className="text-3xl font-bold text-center text-white ">Projects</h2>
      <div className="flex flex-wrap justify-center mt-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="m-4 p-6 bg-gray-200 rounded-lg shadow-md "
          >
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="mt-2">{project.description}</p>
            <a href={project.link} className="text-blue-600 mt-4 inline-block">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

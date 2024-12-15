import React from "react";
import project2Image from "../assets/berserk.png";

const projects = [
  {
    image: project2Image, // Replace with the actual image path or URL
    title: "Web Application",
    projectTitle: "Project One",
    description: "A cool project that does X.",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    link: "https://github.com/project-one",
    stack: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    image: project2Image, // Replace with the actual image path or URL
    title: "Web Application",
    projectTitle: "Project Two",
    description: "Another cool project that does Y.",
    features: ["Feature A", "Feature B", "Feature C"],
    link: "https://github.com/project-two",
    stack: ["Vue.js", "Firebase", "Tailwind CSS"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="bg-[#111827] py-16">
      <h2 className="text-6xl font-bold text-center text-white">Projects</h2>
      <p className="text-lg font-bold text-white mt-4 font-oswald text-center">
        Projects I have worked on
      </p>
      <div className="flex flex-wrap justify-center mt-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row w-full max-w-4xl m-4 p-6 rounded-lg"
          >
            {/* Left side: Image */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <img
                src={project.image}
                alt={project.projectTitle}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Right side: Project details */}
            <div className="w-full md:w-2/3 md:ml-6">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <h4 className="text-lg font-semibold mt-2 text-white">
                {project.projectTitle}
              </h4>
              <p className="mt-2 text-gray-300">{project.description}</p>

              <ul className="list-disc list-inside mt-4 text-gray-300">
                {project.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                View on GitHub
              </a>

              {/* Divider */}
              <hr className="my-6 border-t border-gray-400" />

              {/* Stack: Technologies used */}
              <div>
                <h5 className="font-semibold text-white">Technologies Used:</h5>
                <div className="flex flex-wrap mt-2">
                  {project.stack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-800 text-white px-2 py-1 rounded-md m-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

import React, { useState } from "react";

const allProjects = [
  {
    image: "/assets/berserk.png",
    title: "IoT Based - Water Quality Monitoring System",
    projectTitle: "Mobile and Web Application",
    description:
      "A Mobile and Web based Monitoring IoT System, that takes water turbidity level and pH level using Arduino.",
    features: [
      "pH Level",
      "Turbidity Level",
      "Real Time Monitoring",
      "Admin Dashboard",
      "User Dashboard",
    ],
    link: "https://github.com/Ren-Tech/IoT-Based-Water-Quality-Monitoring-System-Web-based",
    stack: ["Flutter", "Dart", "Firebase", "Node.js", "C++", "Arduino"],
  },
  {
    image: "/assets/berserk.png",
    title: "Web Application",
    projectTitle: "Project Two",
    description: "Another cool project that does Y.",
    features: ["Feature A", "Feature B", "Feature C"],
    link: "https://github.com/project-two",
    stack: ["Vue.js", "Firebase", "Tailwind CSS"],
  },
  {
    image: "/assets/berserk.png",
    title: "Mobile App",
    projectTitle: "Project Three",
    description: "A mobile application for Z.",
    features: ["Mobile Feature 1", "Mobile Feature 2"],
    link: "https://github.com/project-three",
    stack: ["React Native", "Firebase"],
  },
  {
    image: "/assets/berserk.png",
    title: "Web Application",
    projectTitle: "Project Four",
    description: "An e-commerce platform.",
    features: ["Cart System", "Payment Integration", "User Dashboard"],
    link: "https://github.com/project-four",
    stack: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    image: "/assets/berserk.png",
    title: "Desktop Application",
    projectTitle: "Project Five",
    description: "A cross-platform desktop app.",
    features: ["Offline Support", "Native Features"],
    link: "https://github.com/project-five",
    stack: ["Electron", "React", "TypeScript"],
  },
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(2);
  const [showAll, setShowAll] = useState(false);

  const toggleProjects = () => {
    if (showAll) {
      setVisibleProjects(2);
    } else {
      setVisibleProjects(allProjects.length);
    }
    setShowAll(!showAll);
  };

  const projectsToShow = allProjects.slice(0, visibleProjects);

  return (
    <section id="projects" className="bg-[#111827] py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center text-white">
          Projects
        </h2>
        <p className="text-base sm:text-lg font-bold text-white mt-2 sm:mt-4 text-center">
          Projects I have worked on
        </p>

        <div className="grid gap-6 sm:gap-8 mt-6 sm:mt-8">
          {projectsToShow.map((project, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col sm:flex-row hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="sm:w-1/3 flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.projectTitle}
                  className="w-full h-48 sm:h-64 object-cover"
                />
              </div>

              {/* Project Details */}
              <div className="p-4 sm:p-6 sm:w-2/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <h4 className="text-base sm:text-lg font-semibold mt-1 sm:mt-2 text-gray-200">
                    {project.projectTitle}
                  </h4>
                  <p className="mt-2 text-gray-300 text-sm sm:text-base">
                    {project.description}
                  </p>

                  <ul className="list-disc list-inside mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 sm:mt-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-sm sm:text-base transition-colors duration-300"
                  >
                    View on GitHub
                  </a>

                  {/* Divider */}
                  <hr className="my-4 sm:my-6 border-t border-gray-700" />

                  {/* Stack: Technologies Used */}
                  <div>
                    <h5 className="font-semibold text-white text-sm sm:text-base">
                      Technologies Used:
                    </h5>
                    <div className="flex flex-wrap mt-2 gap-2">
                      {project.stack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gray-800 text-white px-2 py-1 rounded-md text-xs sm:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={toggleProjects}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;

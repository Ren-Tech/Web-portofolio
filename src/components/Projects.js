import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiGithub,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

// Import images from assets folder
// Adjust the path based on your component location relative to assets folder
const importImage = (imageName) => {
  try {
    return require(`../assets/${imageName}`);
  } catch (err) {
    return null;
  }
};

const allProjects = [
  {
    id: 1,
    image: importImage("berserk.png"),
    title: "This Web Portfolio",
    projectTitle: "My Personal Portfolio",
    description:
      "A modern, responsive portfolio website showcasing my skills, projects, and professional journey.",
    features: [
      "Responsive Design",
      "Project Showcase",
      "Interactive UI Elements",
      "Dark/Light Mode",
      "Contact Form",
    ],
    link: "https://github.com/Ren-Tech/my-portfolio",
    demoLink: "https://yourportfolio.com",
    stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "web",
    year: 2023,
  },
  {
    id: 2,
    image: importImage("berserk.png"),
    title: "IoT Based - Water Quality Monitoring System",
    projectTitle: "Mobile and Web Application",
    description:
      "A Mobile and Web based Monitoring IoT System that takes water turbidity level and pH level using Arduino with real-time data visualization.",
    features: [
      "pH Level Monitoring",
      "Turbidity Level Analysis",
      "Real Time Data Visualization",
      "Admin Dashboard with Analytics",
      "User Notification System",
    ],
    link: "https://github.com/Ren-Tech/IoT-Based-Water-Quality-Monitoring-System-Web-based",
    demoLink: "https://psmwaterquality.firebaseapp.com/",
    stack: ["Flutter", "Dart", "Firebase", "Node.js", "C++", "Arduino", "ESP8266"],
    category: "iot",
    year: 2023,
  },

  {
    id: 3,
    image: importImage("news-scraper.png"),
    title: "Financial News Aggregator",
    projectTitle: "Web Application",
    description:
      "A Python-based web application that scrapes and aggregates financial news from various sources, allowing users to filter by region, market segments, sectors, and access stock data and economic calendar analytics.",
    features: [
      "Region-Based News Filtering",
      "Market News Aggregation",
      "Sector-Specific Articles",
      "Company-Specific Articles",
      "Economic Calendar Integration",
      "Live Stock Feeds",
      "News Analytics & Insights",
    ],
    link: "https://github.com/project-financial-scraper",
    demoLink: "http://insightedge.pro/",
    stack: [
      "Python",
      "Scrapy",
      "Flask",
      "BeautifulSoup",
      "Pandas",
      "Plotly",
      "HTML",
      "Cython",
      "XSLT",
    ],
    category: "web",
    year: 2025,
  },

{
  id: 4,
  image: importImage("kizuna.png"),
  title: "Kizuna Anime Tracker",
  projectTitle: "Cross-Platform Mobile Application",
  description:
    "Kizuna is a cross-platform anime tracking mobile application that provides a personalized dashboard for managing anime across categories such as Watching, Plan to Watch, and Dropped. The app empowers users to build their own library, track progress, and explore upcoming anime with an interactive calendar. It also includes advanced statistics, social ranking, and discovery features, making anime tracking engaging and interactive.",
  features: [
    "Dashboard with categories: Watching, Plan to Watch, Dropped",
    "Bookmark system for creating personal anime library",
    "Browse anime with detailed info and related anime recommendations",
    "Calendar for upcoming anime (Monday–Sunday)",
    "Announcements for upcoming releases",
    "Stats: rating distribution, episode watch heatmap (per month), favorite producers & genres",
    "User ranking system with EXP based on watched episodes",
    "Character list for each anime",
    "Search anime functionality",
    "Source manager: add favorite websites for faster access",
    "Built-in ad blocker for a smoother experience"
  ],
  link: "https://github.com/project-kizuna",
  demoLink: "https://kizuna-demo.com",
  stack: ["Flutter", "Dart", "Supabase", "AniList API", "SQLite"],
  category: "mobile",
  year: 2025,
},

{
  id: 5,
  image: importImage("berserk.png"),
  title: "Learning Stack Management Web Application",
  projectTitle: "Learning Management System",
  description:
    "A modern web-based Learning Management System (LMS) designed with dashboard animations, mobile responsiveness, and real-time communication. It enables seamless interaction between teachers, students, and parents while supporting quizzes, exams, and role-based access for administrators.",
  features: [
    "Dashboard with smooth animations",
    "Mobile responsive design",
    "Real-time chat between parents and teachers",
    "Quizzes and exams module",
    "Role-based accounts: Teacher, Admin, Student",
    "Performance tracking and reports",
    "Secure authentication system"
  ],
  link: "https://github.com/project-five",
  demoLink: "https://lms-app-demo.com",
  stack: ["React", "Node.js", "Express", "Socket.IO", "MongoDB", "TailwindCSS"],
  category: "web",
  year: 2025,
},
{
  id: 6,
  image: importImage("hydrofarm.png"),
  title: "Hydro Farm Monitoring System",
  projectTitle: "Cross-Platform IoT Web & Mobile Application",
  description:
    "Hydro Farm is an IoT-powered mobile and web application that monitors aquaculture water quality in real time using Arduino Uno and NodeMCU. It tracks critical parameters such as salinity, pH, temperature, and turbidity, while providing alerts, analytics, and role-based management. Designed for farm owners, technicians, and workers, the system ensures optimal pond conditions, species-specific guidance, and reliable operations even offline.",
  features: [
    "Real-time monitoring of water salinity, pH, temperature, and turbidity",
    "Parameter trends and system status dashboard",
    "Alert system with customizable min/max thresholds, notifications, and animations",
    "Analytics with calendar-based views: last 24 hours, weekly, monthly, all data",
    "User management: add users, assign roles (Owner, Technician, Worker), activate/deactivate accounts",
    "Pond management: add ponds with species, dimensions, and species-specific categories",
    "Species profiles with acceptable ranges for water parameters",
    "Guidance system suggesting adjustments to improve water quality",
    "Offline mode with data sync when Wi-Fi is unavailable",
    "Automated water quality reports and summary statistics"
  ],
  link: "https://github.com/project-hydrofarm",
  demoLink: "https://hydrofarm-demo.com",
  stack: ["Flutter", "Dart", "Arduino", "ESP8266", "Arduino", "Firebase", "C++",],
  category: "iot",
  year: 2025,
},

];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Handle image loading errors
  const handleImageError = (projectId) => {
    setImageErrors(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  // Get fallback image for failed loads
  const getFallbackImage = (project) => {
    const colors = {
      iot: "3b82f6",
      web: "6366f1", 
      mobile: "10b981",
      desktop: "f59e0b"
    };
    const color = colors[project.category] || "6b7280";
    return `https://via.placeholder.com/600x400/${color}/ffffff?text=${encodeURIComponent(project.title)}`;
  };

  const toggleProjects = () => {
    if (showAll) {
      setVisibleProjects(3);
    } else {
      setVisibleProjects(allProjects.length);
    }
    setShowAll(!showAll);
  };

  const projectsToShow = allProjects.slice(0, visibleProjects);

  const techColors = {
    Flutter:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    Dart: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Firebase:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "Node.js":
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "C++": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Arduino: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    React: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    MongoDB:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Stripe:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "Tailwind CSS":
      "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    "React Native":
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Redux:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "Chart.js":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "Vue.js":
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    WebSockets:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    Electron: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Weather API": "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
    Python: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Flask: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    Pandas: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Plotly: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    Scrapy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    BeautifulSoup: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    HTML: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Cython: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    XSLT: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "Next.js": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    "Framer Motion": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    Vercel: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };

  const categoryColors = {
    iot: "bg-blue-500",
    web: "bg-purple-500",
    mobile: "bg-green-500",
    desktop: "bg-orange-500",
  };

  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 sm:py-20 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
            My Projects
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my portfolio of projects across different technologies and
            platforms
          </p>
        </motion.div>

        <div className="grid gap-8 md:gap-10">
          <AnimatePresence>
            {projectsToShow.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col lg:flex-row group border border-gray-200 dark:border-gray-700"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="lg:w-1/2 xl:w-3/5 relative overflow-hidden">
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={
                        imageErrors[project.id] 
                          ? getFallbackImage(project) 
                          : (project.image || getFallbackImage(project))
                      }
                      alt={project.projectTitle}
                      className={`w-full h-full object-contain bg-gray-100 dark:bg-gray-700 transition-transform duration-500 ${
                        hoveredProject === project.id
                          ? "scale-105"
                          : "scale-100"
                      }`}
                      onError={() => handleImageError(project.id)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="flex gap-3">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 bg-white/90 text-gray-800 rounded-full hover:bg-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8 lg:w-1/2 xl:w-2/5 flex flex-col">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          categoryColors[project.category]
                        } text-white`}
                      >
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>

                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                      {project.projectTitle}
                    </h4>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              techColors[tech] ||
                              "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex gap-2">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                        >
                          <FiGithub />
                          <span>View Code</span>
                        </a>
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <FiExternalLink />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {allProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <button
              onClick={toggleProjects}
              className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {showAll ? (
                  <>
                    <FiChevronUp className="w-5 h-5" />
                    <span>Show Less Projects</span>
                  </>
                ) : (
                  <>
                    <FiChevronDown className="w-5 h-5" />
                    <span>Show More Projects</span>
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
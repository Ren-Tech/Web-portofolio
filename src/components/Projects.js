import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiCpu,
} from "react-icons/fi";

// Import images from assets folder
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
    image: importImage("web-portfolio.png"),
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
    stack: ["React", "Node.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "Web",
    year: 2023,
  },
  {
    id: 2,
    image: importImage("smp.png"),
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
    category: "IoT",
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
    category: "Web",
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
    category: "Mobile",
    year: 2025,
  },
  {
    id: 5,
    image: importImage(""),
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
    category: "Web",
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
    stack: ["Flutter", "Dart", "Arduino", "ESP8266", "Arduino", "Firebase", "C++"],
    category: "IoT",
    year: 2025,
  },
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [imageErrors, setImageErrors] = useState({});
  const [expandedFeatures, setExpandedFeatures] = useState({});

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
      IoT: "3b82f6",
      Web: "6366f1", 
      Mobile: "10b981",
      Desktop: "f59e0b"
    };
    const color = colors[project.category] || "6b7280";
    return `https://via.placeholder.com/800x400/${color}/ffffff?text=${encodeURIComponent(project.title)}`;
  };

  const toggleProjects = () => {
    if (showAll) {
      setVisibleProjects(3);
    } else {
      setVisibleProjects(allProjects.length);
    }
    setShowAll(!showAll);
  };

  // Filter projects by category
  const filteredProjects = activeFilter === "All" 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);

  const projectsToShow = filteredProjects.slice(0, visibleProjects);

  const toggleFeatures = (projectId) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getVisibleFeatures = (features, projectId) => {
    const isExpanded = expandedFeatures[projectId];
    if (features.length <= 5) return features;
    return isExpanded ? features : features.slice(0, 5);
  };

  const techColors = {
    React: "bg-blue-600 text-white",
    "Node.js": "bg-green-600 text-white",
    "Tailwind CSS": "bg-cyan-600 text-white",
    "Framer Motion": "bg-pink-600 text-white",
    Vercel: "bg-black text-white",
    Flutter: "bg-blue-500 text-white",
    Dart: "bg-blue-700 text-white",
    Firebase: "bg-orange-600 text-white",
    "C++": "bg-purple-600 text-white",
    Arduino: "bg-teal-600 text-white",
    ESP8266: "bg-red-600 text-white",
    Python: "bg-yellow-600 text-white",
    Scrapy: "bg-green-700 text-white",
    Flask: "bg-gray-700 text-white",
    BeautifulSoup: "bg-blue-800 text-white",
    Pandas: "bg-indigo-600 text-white",
    Plotly: "bg-blue-600 text-white",
    HTML: "bg-orange-500 text-white",
    Cython: "bg-yellow-500 text-white",
    XSLT: "bg-purple-500 text-white",
    Supabase: "bg-green-600 text-white",
    "AniList API": "bg-blue-500 text-white",
    SQLite: "bg-gray-600 text-white",
    Express: "bg-gray-800 text-white",
    "Socket.IO": "bg-black text-white",
    MongoDB: "bg-green-700 text-white",
    TailwindCSS: "bg-cyan-600 text-white"
  };

  const categoryIcons = {
    IoT: FiCpu,
    Web: FiGlobe,
    Mobile: FiSmartphone,
    Desktop: FiCode,
  };

  const filters = ["All", "Web", "Mobile", "IoT"];

  return (
    <section id="projects" className="bg-gradient-to-b from-[#111827] to-[#0f172a] py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 font-oswald mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto">
            Explore my portfolio of innovative projects across different technologies
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filters.map((filter) => {
            const IconComponent = categoryIcons[filter] || FiCode;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {filter}
              </button>
            );
          })}
        </motion.div>

        {/* Projects List */}
        <div className="max-w-7xl mx-auto space-y-8">
          <AnimatePresence>
            {projectsToShow.map((project, index) => {
              const CategoryIcon = categoryIcons[project.category] || FiCode;
              const visibleFeatures = getVisibleFeatures(project.features, project.id);
              const projectImage = imageErrors[project.id] 
                ? getFallbackImage(project) 
                : (project.image || getFallbackImage(project));
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    
                    <div className="flex flex-col lg:flex-row min-h-[400px]">
                      {/* IMAGE CONTAINER - with subtle blurred background */}
                      <div className="lg:w-3/5 relative overflow-hidden rounded-l-xl">
                        {/* Subtle Blurred Background Image */}
                        <div 
                          className="absolute inset-0 z-0"
                          style={{
                            backgroundImage: `url(${projectImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(8px) brightness(0.9)',
                            transform: 'scale(1.02)',
                          }}
                        />
                        
                        {/* Main Image Container */}
                        <div className="relative z-10 h-full flex items-center justify-center p-4">
                          <img
                            src={projectImage}
                            alt={project.projectTitle}
                            className="w-full h-full object-contain rounded-lg transition-all duration-300 relative z-20"
                            onError={() => handleImageError(project.id)}
                            loading="lazy"
                          />
                          
                          {/* Subtle Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-gray-900/10 z-30 rounded-l-xl"></div>
                          
                          {/* Project Badges */}
                          <div className="absolute top-3 left-3 flex items-center gap-2 z-40">
                            <div className="bg-black/70 backdrop-blur-sm rounded-full p-1.5">
                              <CategoryIcon className="w-3 h-3 text-white" />
                            </div>
                            <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium">
                              {project.category}
                            </span>
                            <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-medium">
                              {project.year}
                            </span>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="absolute bottom-3 right-3 flex gap-2 z-40">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                              title="View Source Code"
                            >
                              <FiGithub className="w-3 h-3" />
                            </a>
                            {project.demoLink && (
                              <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                                title="View Live Demo"
                              >
                                <FiExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* TEXT CONTAINER - Separate container for project content */}
                      <div className="lg:w-2/5 bg-gray-900/50 backdrop-blur-sm rounded-r-xl">
                        <div className="p-6 h-full flex flex-col">
                          {/* Project Header */}
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-1">
                              {project.title}
                            </h3>
                            <h4 className="text-base text-blue-300 mb-3 font-medium opacity-90">
                              {project.projectTitle}
                            </h4>
                            <p className="text-gray-300 leading-relaxed text-xs">
                              {project.description}
                            </p>
                          </div>

                          {/* Key Features */}
                          <div className="mb-4 flex-grow">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                              Key Features
                            </h4>
                            <ul className="space-y-1.5 mb-3">
                              {visibleFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                  <span className="text-gray-300 text-xs leading-relaxed">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            
                            {/* Show More/Less Features */}
                            {project.features.length > 5 && (
                              <button
                                onClick={() => toggleFeatures(project.id)}
                                className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors font-medium"
                              >
                                {expandedFeatures[project.id] ? (
                                  <>
                                    <FiChevronUp className="w-3 h-3" />
                                    Show Less
                                  </>
                                ) : (
                                  <>
                                    <FiChevronDown className="w-3 h-3" />
                                    Show More ({project.features.length - 5})
                                  </>
                                )}
                              </button>
                            )}
                          </div>

                          {/* Tech Stack */}
                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    techColors[tech] || "bg-gray-700 text-gray-200"
                                  } shadow-sm`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-auto">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 flex-1 text-center font-medium text-xs hover:shadow-lg hover:shadow-blue-500/25"
                            >
                              <FiGithub className="w-3 h-3" />
                              View Code
                            </a>
                            {project.demoLink && (
                              <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 flex-1 text-center font-medium text-xs"
                              >
                                <FiExternalLink className="w-3 h-3" />
                                Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {filteredProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <button
              onClick={toggleProjects}
              className="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium text-sm">
                {showAll ? (
                  <>
                    <FiChevronUp className="w-4 h-4" />
                    Show Less Projects
                  </>
                ) : (
                  <>
                    <FiChevronDown className="w-4 h-4" />
                    Load More Projects ({filteredProjects.length - 3})
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        )}

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <div className="text-gray-400 text-base">
              No projects found in the {activeFilter} category.
            </div>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-3 text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              View all projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
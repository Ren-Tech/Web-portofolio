import pogiImage from "../assets/pogi.png";  
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Icons
const EmailIcon = ({ size = 48, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GithubIcon = ({ size = 48, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 48, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);


const LocationIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CoffeeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const Home = () => {
  const [visible, setVisible] = useState(true);
  const [typingText, setTypingText] = useState("A passionate Mobile and Web Developer");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showExtraInfo, setShowExtraInfo] = useState(true);

  const texts = [
    "A passionate Full-Stack Developer",
    "A passionate Mobile Application Developer", 
    "A passionate Web Application Developer",
    "Building amazing digital experiences",
    "Crafting code with love and coffee ☕",
  ];


  const stats = [
    { label: "Years of Experience", value: "3+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Lines of Code", value: "100k+" },
    { label: "Coffee Cups", value: "∞" }
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetween = 2000;

  useEffect(() => {
    // Set everything to visible immediately on first load
    setVisible(true);
    setShowExtraInfo(true);

    // Mouse tracking for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Typing effect - start immediately
    const typingTimer = setTimeout(() => {
      const currentText = texts[typingIndex % texts.length];
      if (isDeleting) {
        setTypingText(currentText.substring(0, typingText.length - 1));
        if (typingText === "") {
          setIsDeleting(false);
          setTypingIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        setTypingText(currentText.substring(0, typingText.length + 1));
        if (typingText === currentText) {
          setTimeout(() => setIsDeleting(true), pauseBetween);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      clearTimeout(typingTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [typingText, typingIndex, isDeleting]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#111827] via-[#1e293b] to-[#0f172a] flex flex-col md:flex-row justify-center items-center px-4 md:px-16 relative overflow-hidden">
      {/* Enhanced Background decorative elements with parallax */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"
          animate={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"
          animate={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"
          animate={{
            x: mousePosition.x * 0.2,
            y: mousePosition.y * 0.2,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            type: "spring", 
            stiffness: 50,
            scale: { duration: 4, repeat: Infinity }
          }}
        />
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-400/20 text-sm font-mono"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 10)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 5, -5, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            {['{', '}', '</', '/>', '=', '=>'][i]}
          </motion.div>
        ))}
      </div>

      {/* Status Bar */}
      <motion.div
        className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg z-10 border border-gray-700"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Available for work</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
          <LocationIcon />
          <span>Philippines</span>
          <CoffeeIcon />
          <span>Fueled by coffee</span>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 z-10">
        {/* Profile Image with Enhanced Effects - Using the imported image */}
        <motion.div
          className="order-first lg:order-none w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Using the imported image - Text removed */}
            <div className="w-80 h-80 rounded-2xl shadow-2xl mb-8 lg:mb-0 relative overflow-hidden">
              <img 
                src={pogiImage} 
                alt="Clarence" 
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              
            
            </div>
          </motion.div>
        </motion.div>

        {/* Left Side - Enhanced Content */}
        <div className="flex flex-col lg:flex-row items-center w-full lg:w-1/2">
          {/* Social Icons with Enhanced Animation */}
          <motion.div
            className="flex lg:flex-col space-x-6 lg:space-x-0 lg:space-y-6 lg:mr-8 mb-6 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -50 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              { href: "mailto:clarence11soriano@gmail.com", icon: EmailIcon, label: "Email" },
              { href: "https://github.com/Ren-Tech", icon: GithubIcon, label: "GitHub" },
              { href: "https://www.linkedin.com/in/yourusername/", icon: LinkedinIcon, label: "LinkedIn" }
            ].map(({ href, icon: Icon, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? "_blank" : undefined}
                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="text-white hover:text-blue-400 transition-all duration-300 relative group"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Icon size={32} className="lg:w-12 lg:h-12" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 rounded">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Animated Divider */}
          <motion.div
            className="hidden lg:block w-1 h-48 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50 mr-8 rounded-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: visible ? 192 : 0, opacity: visible ? 0.5 : 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />

          {/* Enhanced Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl lg:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Hi, I'm Clarence
            </motion.h1>
            
            <motion.div
              className="text-xl lg:text-3xl mb-6 text-amber-400 font-semibold h-20 flex items-center justify-center lg:justify-start"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
            
              <span>
                {typingText}
                <motion.span
                  className="text-blue-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            </motion.div>

            {/* Stats Counter - Always visible now */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="#projects"
                className="group relative inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg text-center overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                 

                  See My Work
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="buttonHover"
                />
              </motion.a>
              
              <motion.a
                href="#contact"
                className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg transition-all duration-300 hover:bg-white hover:text-blue-600 text-lg text-center relative group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact Me</span>
                <motion.div
                  className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                />
              </motion.a>
            </motion.div>

            {/* Quick Contact Info - Always visible now */}
            <motion.div
              className="mt-8 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="mb-2">💬 Let's build something amazing together!</p>
              <p>🚀 Currently open to new opportunities</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
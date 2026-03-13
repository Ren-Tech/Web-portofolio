import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiCpu,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
} from "react-icons/fi";

// Import images from assets folder
const importImage = (imageName) => {
  try {
    return require(`../assets/${imageName}`);
  } catch (err) {
    return null;
  }
};

const importMultipleImages = (imageNames) => {
  return imageNames.map(name => importImage(name)).filter(img => img !== null);
};

const allProjects = [
  {
    id: 1,
    image: importImage("web-portfolio.png"),
    screenshots: importMultipleImages(["web-portfolio.png", "pogi.png", "portfolio-logo.png"]),
    screenLabels: ["Home", "About", "Projects"],
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
    screenshots: importMultipleImages(["smp.png", "me1.jpg", "me2.jpg"]),
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
    screenshots: importMultipleImages(["news-scraper.png", "market-news.png", "learn.png"]),
    screenLabels: ["Dashboard", "News Feed", "Analytics"],
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
      "Python", "Scrapy", "Flask", "BeautifulSoup", "Pandas", "Plotly",
      "HTML", "Cython", "XSLT",
    ],
    category: "Web",
    year: 2025,
  },
  {
    id: 4,
    image: importImage("kizu.jpg"),
    screenshots: importMultipleImages(["kizu.jpg", "me3.jpg", "me4.jpg", "pogi.png"]),
    screenLabels: ["Home", "Browse", "Details", "Profile"],
    title: "Kizuna Anime Tracker",
    projectTitle: "Cross-Platform Mobile Application",
    description:
      "Kizuna is a cross-platform anime tracking mobile application that provides a personalized dashboard for managing anime across categories such as Watching, Plan to Watch, and Dropped.",
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
    image: importImage("learn.png"),
    screenshots: importMultipleImages(["learn.png", "web-portfolio.png", "pogi.png"]),
    screenLabels: ["Dashboard", "Courses", "Profile"],
    title: "Learning Stack Management Web Application",
    projectTitle: "Learning Management System",
    description:
      "A modern web-based Learning Management System (LMS) designed with dashboard animations, mobile responsiveness, and real-time communication.",
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
    demoLink: "https://learningstack.net/",
    stack: ["React", "Node.js", "Express", "Socket.IO", "MongoDB", "TailwindCSS"],
    category: "Web",
    year: 2025,
  },
];

// ─────────────────────────────────────────────────────────────
// Mobile Showcase Component — redesigned
// ─────────────────────────────────────────────────────────────
const MobileShowcase = ({ project, getFallbackImage }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(null);
  const screenshots = project.screenshots || [project.image];
  const labels = project.screenLabels || screenshots.map((_, i) => `Screen ${i + 1}`);
  const total = screenshots.length;

  const goTo = (idx) => setActiveIdx((idx + total) % total);

  // Drag / swipe support
  const handleDragStart = (e) => {
    dragStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setIsDragging(false);
  };
  const handleDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 30) {
      setIsDragging(true);
      diff > 0 ? goTo(activeIdx + 1) : goTo(activeIdx - 1);
    }
    dragStartX.current = null;
  };

  const openLightbox = (idx) => {
    if (isDragging) return;
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 select-none">
      {/* ── Ambient glow behind phones ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-48 h-48 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #6366f1, #3b82f6)" }}
        />
      </div>

      {/* ── Phone stack ── */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: "100%", maxWidth: 340, height: 320 }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {screenshots.map((src, idx) => {
          const offset = idx - activeIdx;
          const wrappedOffset = ((offset % total) + total) % total;
          // Show at most prev / active / next
          const displayOffset =
            wrappedOffset === 0 ? 0
            : wrappedOffset === 1 ? 1
            : wrappedOffset === total - 1 ? -1
            : null;
          if (displayOffset === null) return null;

          const isActive = displayOffset === 0;
          const scale = isActive ? 1 : 0.78;
          const x = displayOffset * 140;
          const zIndex = isActive ? 20 : 10;
          const opacity = isActive ? 1 : 0.55;
          const blurAmount = isActive ? 0 : 2;

          return (
            <motion.div
              key={idx}
              animate={{ x, scale, opacity, filter: `blur(${blurAmount}px)` }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              style={{ position: "absolute", zIndex, cursor: isActive ? "zoom-in" : "pointer" }}
              onClick={() => isActive ? openLightbox(idx) : goTo(idx)}
              whileHover={isActive ? { scale: 1.03 } : { scale: 0.82, opacity: 0.7 }}
            >
              {/* Phone frame - simplified without notch */}
              <div
                className="relative"
                style={{
                  width: isActive ? 170 : 130,
                  background: "linear-gradient(145deg, #1e1e2e, #16161d)",
                  borderRadius: 28,
                  padding: "10px 6px 14px",
                  boxShadow: isActive
                    ? "0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)"
                    : "0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
                  transition: "width 0.3s ease",
                }}
              >
                {/* Side buttons */}
                <div style={{
                  position: "absolute", right: -3, top: 50,
                  width: 3, height: 24, background: "#2a2a3e", borderRadius: "0 3px 3px 0",
                }} />
                <div style={{
                  position: "absolute", left: -3, top: 40,
                  width: 3, height: 16, background: "#2a2a3e", borderRadius: "3px 0 0 3px",
                }} />

                {/* Screen */}
                <div style={{
                  borderRadius: 18, overflow: "hidden",
                  background: "#000",
                  aspectRatio: "9/19.5",
                }}>
                  <img
                    src={src || getFallbackImage(project)}
                    alt={`${project.title} - ${labels[idx]}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => { e.target.src = getFallbackImage(project); }}
                    draggable={false}
                  />
                </div>

                {/* Active screen label badge */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)",
                      background: "rgba(99,102,241,0.85)", backdropFilter: "blur(8px)",
                      color: "#fff", fontSize: 10, fontWeight: 600,
                      padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap",
                      letterSpacing: "0.05em", textTransform: "uppercase",
                    }}
                  >
                    {labels[idx]}
                  </motion.div>
                )}

                {/* Zoom icon hint on active */}
                {isActive && (
                  <div style={{
                    position: "absolute", top: 14, right: 10,
                    background: "rgba(0,0,0,0.5)", borderRadius: "50%",
                    padding: 4, display: "flex",
                  }}>
                    <FiMaximize2 style={{ width: 8, height: 8, color: "#fff" }} />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={() => goTo(activeIdx - 1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full transition-all duration-200"
        style={{
          width: 32, height: 32,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
        }}
      >
        <FiChevronLeft style={{ width: 14, height: 14, color: "#e2e8f0" }} />
      </button>
      <button
        onClick={() => goTo(activeIdx + 1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full transition-all duration-200"
        style={{
          width: 32, height: 32,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(6px)",
        }}
      >
        <FiChevronRight style={{ width: 14, height: 14, color: "#e2e8f0" }} />
      </button>

      {/* ── Dot indicators ── */}
      <div
        className="absolute flex gap-1.5 items-center"
        style={{ bottom: 4, left: "50%", transform: "translateX(-50%)" }}
      >
        {screenshots.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            style={{
              width: idx === activeIdx ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: idx === activeIdx
                ? "linear-gradient(90deg, #6366f1, #3b82f6)"
                : "rgba(255,255,255,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center"
              style={{ maxWidth: 320, width: "90vw" }}
            >
              {/* Phone frame in lightbox - simplified */}
              <div
                style={{
                  background: "linear-gradient(145deg, #1e1e2e, #16161d)",
                  borderRadius: 36,
                  padding: "14px 8px 18px",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15)",
                  width: "100%",
                }}
              >
                <div style={{ borderRadius: 26, overflow: "hidden", aspectRatio: "9/19.5" }}>
                  <img
                    src={screenshots[lightboxIdx] || getFallbackImage(project)}
                    alt={labels[lightboxIdx]}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>

              {/* Lightbox label */}
              <div className="mt-4 text-center">
                <span style={{
                  background: "linear-gradient(90deg, #6366f1, #3b82f6)",
                  color: "#fff", fontSize: 11, fontWeight: 700,
                  padding: "4px 14px", borderRadius: 20,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  {labels[lightboxIdx]}
                </span>
              </div>

              {/* Lightbox navigation */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => setLightboxIdx((lightboxIdx - 1 + total) % total)}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 40, height: 40,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <FiChevronLeft style={{ color: "#fff", width: 16, height: 16 }} />
                </button>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                  {lightboxIdx + 1} / {total}
                </span>
                <button
                  onClick={() => setLightboxIdx((lightboxIdx + 1) % total)}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 40, height: 40,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  <FiChevronRight style={{ color: "#fff", width: 16, height: 16 }} />
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-4 -right-4 flex items-center justify-center rounded-full"
                style={{
                  width: 36, height: 36,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                <FiX style={{ width: 16, height: 16 }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Projects Component
// ─────────────────────────────────────────────────────────────
const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [imageErrors, setImageErrors] = useState({});
  const [expandedFeatures, setExpandedFeatures] = useState({});

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const getFallbackImage = (project) => {
    const colors = { IoT: "3b82f6", Web: "6366f1", Mobile: "10b981", Desktop: "f59e0b" };
    const color = colors[project.category] || "6b7280";
    return `https://via.placeholder.com/800x400/${color}/ffffff?text=${encodeURIComponent(project.title)}`;
  };

  const getCategoryColor = (category) => {
    const colors = { 
      IoT: "#3b82f6",  // blue
      Web: "#6366f1",  // indigo
      Mobile: "#10b981", // emerald
      Desktop: "#f59e0b" // amber
    };
    return colors[category] || "#6b7280";
  };

  // ─────────────────────────────────────────────────────────────
  // Web Carousel Component - horizontal scroll for web projects
  // ─────────────────────────────────────────────────────────────
  const WebCarousel = ({ project, getFallbackImage }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIdx, setLightboxIdx] = useState(0);
    const scrollRef = useRef(null);
    const screenshots = project.screenshots || [project.image];
    const labels = project.screenLabels || screenshots.map((_, i) => `Screen ${i + 1}`);
    const total = screenshots.length;

    const scroll = (direction) => {
      if (scrollRef.current) {
        const scrollAmount = scrollRef.current.offsetWidth * 0.8;
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    const handleScroll = (e) => {
      const container = e.target;
      const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIdx(newIndex);
    };

    const openLightbox = (idx) => {
      setLightboxIdx(idx);
      setLightboxOpen(true);
    };

    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${getCategoryColor(project.category)}30 0%, transparent 70%)`,
          }}
        />
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Carousel Container */}
        <div className="relative z-10 w-full max-w-2xl">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent snap-x snap-mandatory scroll-smooth"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'thin' }}
          >
            {screenshots.map((src, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-full snap-center"
              >
                <img
                  src={src || getFallbackImage(project)}
                  alt={`${project.title} - ${labels[idx]}`}
                  className="w-full h-auto max-h-[320px] object-contain rounded-lg shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  onClick={() => openLightbox(idx)}
                  onError={(e) => { e.target.src = getFallbackImage(project); }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: 40, height: 40,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <FiChevronLeft style={{ width: 18, height: 18, color: "#fff" }} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: 40, height: 40,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <FiChevronRight style={{ width: 18, height: 18, color: "#fff" }} />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        {total > 1 && (
          <div className="flex gap-2 mt-4">
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollRef.current) {
                    const scrollPosition = idx * scrollRef.current.offsetWidth;
                    scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                    setActiveIdx(idx);
                  }
                }}
                style={{
                  width: idx === activeIdx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: idx === activeIdx
                    ? `linear-gradient(90deg, ${getCategoryColor(project.category)}, ${getCategoryColor(project.category)}aa)`
                    : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
        <p className="text-center text-sm text-gray-400 mt-2">
          {activeIdx + 1} / {total}
        </p>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
              onClick={() => setLightboxOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full mx-4"
              >
                <img
                  src={screenshots[lightboxIdx] || getFallbackImage(project)}
                  alt={labels[lightboxIdx]}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <span style={{
                    background: `linear-gradient(90deg, ${getCategoryColor(project.category)}, ${getCategoryColor(project.category)}aa)`,
                    color: "#fff", fontSize: 12, fontWeight: 600,
                    padding: "6px 16px", borderRadius: 20,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                  }}>
                    {labels[lightboxIdx]}
                  </span>
                </div>
                {/* Navigation */}
                {total > 1 && (
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <button
                      onClick={() => setLightboxIdx((lightboxIdx - 1 + total) % total)}
                      className="flex items-center justify-center rounded-full"
                      style={{ width: 44, height: 44, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
                    >
                      <FiChevronLeft style={{ color: "#fff", width: 18, height: 18 }} />
                    </button>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                      {lightboxIdx + 1} / {total}
                    </span>
                    <button
                      onClick={() => setLightboxIdx((lightboxIdx + 1) % total)}
                      className="flex items-center justify-center rounded-full"
                      style={{ width: 44, height: 44, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
                    >
                      <FiChevronRight style={{ color: "#fff", width: 18, height: 18 }} />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute -top-2 -right-2 flex items-center justify-center rounded-full"
                  style={{ width: 40, height: 40, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}
                >
                  <FiX style={{ width: 18, height: 18 }} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const toggleProjects = () => {
    if (showAll) setVisibleProjects(3); else setVisibleProjects(allProjects.length);
    setShowAll(!showAll);
  };

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  const projectsToShow = filteredProjects.slice(0, visibleProjects);

  const toggleFeatures = (id) => {
    setExpandedFeatures(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getVisibleFeatures = (features, id) => {
    if (features.length <= 5) return features;
    return expandedFeatures[id] ? features : features.slice(0, 5);
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
    TailwindCSS: "bg-cyan-600 text-white",
  };

  const categoryIcons = { IoT: FiCpu, Web: FiGlobe, Mobile: FiSmartphone, Desktop: FiCode };
  const filters = ["All", "Web", "Mobile", "IoT"];

  const isMobileOrIoT = (project) =>
    project.category === "Mobile" || project.category === "IoT";

  const hasMultipleScreenshots = (project) =>
    project.screenshots && project.screenshots.length > 1;

  return (
    <section id="projects" className="bg-gradient-to-b from-[#111827] to-[#0f172a] py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto">
            Explore my portfolio of innovative projects across different technologies
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
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
              const useMobileShowcase = isMobileOrIoT(project);
              const useWebCarousel = project.category === "Web" && hasMultipleScreenshots(project);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-xl overflow-visible hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col lg:flex-row min-h-[400px]">

                      {/* ── IMAGE / SHOWCASE COLUMN ── */}
                      <div className={`lg:w-3/5 relative overflow-hidden rounded-l-xl ${useMobileShowcase ? "bg-gradient-to-br from-gray-950 via-[#0d1117] to-gray-900" : ""}`}>

                        {useMobileShowcase ? (
                          /* ── Mobile showcase (phone frames) ── */
                          <div className="relative z-10 w-full h-full overflow-visible" style={{ minHeight: 360 }}>
                            {/* Subtle grid pattern */}
                            <div
                              className="absolute inset-0 opacity-5 pointer-events-none"
                              style={{
                                backgroundImage: "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
                                backgroundSize: "32px 32px",
                              }}
                            />
                            <MobileShowcase project={project} getFallbackImage={getFallbackImage} />

                            {/* Badges */}
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

                            {/* Quick action links */}
                            <div className="absolute bottom-3 right-3 flex gap-2 z-40">
                              <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                                title="View Source Code">
                                <FiGithub className="w-3 h-3" />
                              </a>
                              {project.demoLink && (
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                                  title="View Live Demo">
                                  <FiExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ) : useWebCarousel ? (
                          /* ── Web carousel for web projects ── */
                          <div className="relative z-10 w-full h-full overflow-visible">
                            <WebCarousel project={project} getFallbackImage={getFallbackImage} />
                            {/* Badges */}
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
                            {/* Quick action links */}
                            <div className="absolute bottom-3 right-3 flex gap-2 z-40">
                              <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                                title="View Source Code">
                                <FiGithub className="w-3 h-3" />
                              </a>
                              {project.demoLink && (
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                                  title="View Live Demo">
                                  <FiExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ) : (
                          /* Regular image for web projects - with gradient background */
                          <div className="relative z-10 h-full flex items-center justify-center p-4">
                            {/* Gradient Background for Web Projects */}
                            <div 
                              className="absolute inset-0"
                              style={{
                                background: `radial-gradient(ellipse at center, ${getCategoryColor(project.category)}20 0%, transparent 70%)`,
                              }}
                            />
                            {/* Grid Pattern Overlay */}
                            <div 
                              className="absolute inset-0 opacity-5"
                              style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                backgroundSize: '32px 32px',
                              }}
                            />
                            <img
                              src={projectImage}
                              alt={project.projectTitle}
                              className="w-full max-w-md lg:max-w-full h-auto max-h-[350px] object-contain rounded-lg transition-all duration-300 relative z-20 shadow-2xl"
                              onError={() => handleImageError(project.id)}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-gray-900/10 z-30 rounded-l-xl" />

                            {/* Badges */}
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

                            {/* Quick action links */}
                            <div className="absolute bottom-3 right-3 flex gap-2 z-40">
                              <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                                title="View Source Code">
                                <FiGithub className="w-3 h-3" />
                              </a>
                              {project.demoLink && (
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                                  title="View Live Demo">
                                  <FiExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* ── TEXT COLUMN ── */}
                      <div className="lg:w-2/5 bg-gray-900/50 backdrop-blur-sm rounded-r-xl">
                        <div className="p-6 h-full flex flex-col">
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

                          <div className="mb-4 flex-grow">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                              Key Features
                            </h4>
                            <ul className="space-y-1.5 mb-3">
                              {visibleFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                  <span className="text-gray-300 text-xs leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            {project.features.length > 5 && (
                              <button
                                onClick={() => toggleFeatures(project.id)}
                                className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors font-medium"
                              >
                                {expandedFeatures[project.id] ? (
                                  <><FiChevronUp className="w-3 h-3" />Show Less</>
                                ) : (
                                  <><FiChevronDown className="w-3 h-3" />Show More ({project.features.length - 5})</>
                                )}
                              </button>
                            )}
                          </div>

                          <div className="mb-4">
                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {project.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${techColors[tech] || "bg-gray-700 text-gray-200"} shadow-sm`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 mt-auto">
                            <a
                              href={project.link} target="_blank" rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 flex-1 text-center font-medium text-xs hover:shadow-lg hover:shadow-blue-500/25"
                            >
                              <FiGithub className="w-3 h-3" />View Code
                            </a>
                            {project.demoLink && (
                              <a
                                href={project.demoLink} target="_blank" rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 flex-1 text-center font-medium text-xs"
                              >
                                <FiExternalLink className="w-3 h-3" />Live Demo
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

        {/* Load More */}
        {filteredProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <button
              onClick={toggleProjects}
              className="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium text-sm">
                {showAll ? (
                  <><FiChevronUp className="w-4 h-4" />Show Less Projects</>
                ) : (
                  <><FiChevronDown className="w-4 h-4" />Load More Projects ({filteredProjects.length - 3})</>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
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
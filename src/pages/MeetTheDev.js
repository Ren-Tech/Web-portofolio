import React, { useRef } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion

// import your images from assets
import berserk from "../assets/me1.jpg";
import pogi from "../assets/me2.jpg";
import guts from "../assets/me3.jpg";
import newsScraper from "../assets/me4.jpg";

// Animation Variants for Scroll Triggering
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2, // Stagger children elements
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const MeetTheDev = () => {
  const ref = useRef(null);

  return (
    <motion.section // Use motion.section for scroll detection
      id="meet-the-dev"
      className="relative overflow-hidden bg-gradient-to-b from-[#111827] to-[#0f172a] py-20 px-4 sm:px-8 md:px-16 lg:px-24"
      ref={ref}
    >
      {/* Background decorative blobs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-72 h-72 bg-amber-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Trigger animation when section comes into view
        viewport={{ once: true, amount: 0.3 }} // Ensures animation only runs once
      >
        {/* Left Side - Info Card */}
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-xl hover:shadow-amber-500/10 transition-shadow duration-300"
          variants={itemVariants} // Inherits scroll animation
          whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(245, 158, 11, 0.2)" }} // Card lift on hover
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Social Icons (Staggered fade-in) */}
          <motion.div 
            className="flex gap-4 mb-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delay: 0.5 }}
          >
            {[
              { icon: <FaFacebook size={24} />, link: "#" },
              { icon: <FaInstagram size={24} />, link: "#" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-amber-500 hover:scale-110 transition transform"
                whileHover={{ scale: 1.2, rotate: 10 }} // Enhanced social icon hover
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Title + Description */}
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-3">
            Meet the Dev
          </h2>
          <p className="text-amber-400 italic mb-6">
            Shinzou wo Sasageyo!
          </p>

          <p className="text-gray-300 mb-4">
            He was a college instructor at the University of Eastern Pangasinan, where he teaches and mentors students. During his student years, he participated in the IT Skills Olympics at UMAC Makati. He has also been working as a freelance full-stack developer for the past three years, collaborating with his Filipino project manager and international clients. As a participant in the IT Skills Olympics, he competed in IoT thesis systems and later expanded his experience by coaching his students in IT Skills Olympics competitions.
          </p>


          <p className="text-gray-300 mb-8">
            When he's not coding, you'll find him reading manga,
            riding hes motorcyle, or staying up to date with the
            latest mobile and web tech.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {["college instructor", "freelancer", "coaching", "learning"].map((tag, i) => (
              <motion.span
                key={i}
                className="bg-amber-500/20 text-amber-400 px-4 py-1 rounded-full text-sm font-medium border border-amber-400/30"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                ${tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Image Grid (Staggered fade-in and enhanced hover) */}
        <div className="grid grid-cols-2 gap-4">
          {[berserk, pogi, guts, newsScraper].map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`work ${i + 1}`}
              className="rounded-xl object-cover w-full h-48 sm:h-60 md:h-64 border border-gray-700"
              variants={itemVariants} // Inherits scroll animation
              whileHover={{ 
                scale: 1.1, 
                rotate: i % 2 === 0 ? 3 : -3, // Subtle rotation on hover
                zIndex: 10, // Bring image to front
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default MeetTheDev;
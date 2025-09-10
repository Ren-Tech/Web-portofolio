import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

// import your images from assets
import berserk from "../assets/me1.jpg";
import pogi from "../assets/me2.jpg";
import guts from "../assets/me3.jpg";
import newsScraper from "../assets/me4.jpg";

const MeetTheDev = () => {
  return (
    <section
      id="meet-the-dev"
      className="relative overflow-hidden bg-gradient-to-b from-[#111827] to-[#0f172a] py-20 px-4 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Background decorative blobs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-72 h-72 bg-amber-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Info Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-xl hover:shadow-amber-500/10 transition-shadow duration-300">
          {/* Social Icons */}
          <div className="flex gap-4 mb-6 justify-center">
            {[
              { icon: <FaFacebook />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-amber-500 hover:scale-110 transition transform"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Title + Description */}
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-3">
            Meet the Dev
          </h2>
          <p className="text-amber-400 italic mb-6">
            Shinzou wo Sasageyo!
          </p>

          <p className="text-gray-300 mb-4">
          He is currently a college instructor at the University of Eastern Pangasinan, where he teaches and mentors students. During his student years, he participated in the IT Skills Olympics at UMAC Makati. He has also been working as a freelance full-stack developer for the past three years, collaborating with his Filipino project manager and international clients. As a participant in the IT Skills Olympics, he competed in IoT thesis systems and later expanded his experience by coaching his students in IT Skills Olympics competitions.
          </p>


          <p className="text-gray-300 mb-8">
            When he's not coding, you'll find him reading manga,
            riding hes motorcyle, or staying up to date with the
            latest mobile and web tech.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {["college instructor", "freelancer", "coaching", "learning"].map((tag, i) => (
              <span
                key={i}
                className="bg-amber-500/20 text-amber-400 px-4 py-1 rounded-full text-sm font-medium border border-amber-400/30"
              >
                ${tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[berserk, pogi, guts, newsScraper].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`work ${i + 1}`}
              className="rounded-xl object-cover w-full h-48 sm:h-60 md:h-64 border border-gray-700 hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheDev;
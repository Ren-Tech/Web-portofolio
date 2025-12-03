import { FaNodeJs, FaPhp, FaHtml5, FaCss3Alt, FaReact, FaJsSquare, FaGitAlt, FaGithub, FaApple, FaRobot } from "react-icons/fa";
import { SiMysql, SiCplusplus, SiFirebase, SiTailwindcss, SiFlutter, SiDart, SiHostinger, SiUbuntu, SiRender, SiVercel, SiVisualstudiocode, SiFigma, SiPostman, SiCanva, SiArduino, SiAdobexd, SiAndroidstudio } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { LuZap } from "react-icons/lu";
import { PiInfinityBold } from "react-icons/pi";
import { IoLogoFirebase, IoTerminal, IoRocket, IoDiamond } from "react-icons/io5";
import { GiCrystalBall, GiPaperPlane } from "react-icons/gi";

// Custom icons
const AIIcons = {
  ChatGPT: () => <FaRobot className="w-full h-full" />,
  Claude: () => <GiCrystalBall className="w-full h-full" />,
  Gemini: () => <IoDiamond className="w-full h-full" />,
  DeepSeek: () => <IoRocket className="w-full h-full" />,
  TestFlight: () => <GiPaperPlane className="w-full h-full" />,
};

export const backendSkills = {
  id: "backend",
  title: "Backend Expertise",
  subtitle: "Server-side technologies that power applications behind the scenes",
  sectionTitle: "Backend Technologies",
  description: "I build robust server-side systems that handle data processing, authentication, and business logic. My backend solutions ensure scalability, security, and seamless integration with frontend interfaces.",
  learningText: "Currently expanding my backend knowledge",
  accentColor: "amber",
  blobColors: ["green-500", "yellow-500", "red-500"],
  skills: [
    { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
    { name: "PHP", icon: <FaPhp />, color: "text-blue-500" },
    { name: "MySQL", icon: <SiMysql />, color: "text-orange-400" },
    { name: "C++", icon: <SiCplusplus />, color: "text-purple-500" },
    { name: "Firebase", icon: <SiFirebase />, color: "text-amber-400" },
    { name: "REST API", icon: <TbApi />, color: "text-blue-400" },
  ]
};

export const frontendSkills = {
  id: "frontend",
  title: "Frontend Expertise",
  subtitle: "Technologies I use to bring ideas to life",
  sectionTitle: "My Development Toolkit",
  description: "I specialize in creating responsive, interactive user interfaces using modern web technologies. My toolkit includes everything from foundational markup languages to powerful frameworks that enable rich user experiences across all devices.",
  learningText: "Currently learning new frameworks",
  accentColor: "amber",
  blobColors: ["blue-500", "purple-500", "cyan-500"],
  skills: [
    { name: "HTML5", icon: <FaHtml5 />, color: "text-orange-600" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "text-blue-600" },
    { name: "JavaScript", icon: <FaJsSquare />, color: "text-yellow-500" },
    { name: "Flutter", icon: <SiFlutter />, color: "text-blue-400" },
    { name: "Dart", icon: <SiDart />, color: "text-blue-500" },
    { name: "React", icon: <FaReact />, color: "text-cyan-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-teal-400" },
  ]
};

export const hostingSkills = {
  id: "servers-and-hosting",
  title: "Hosting & Servers",
  subtitle: "Platforms and services I use to deploy and host applications",
  sectionTitle: "Infrastructure & Deployment",
  description: "I leverage various hosting platforms and server technologies to ensure reliable deployment, optimal performance, and scalable infrastructure for web applications and services.",
  learningText: "Currently exploring cloud solutions",
  accentColor: "amber",
  blobColors: ["purple-500", "amber-500", "blue-500"],
  skills: [
    { name: "Firebase", icon: <IoLogoFirebase />, color: "text-yellow-400" },
    { name: "Hostinger", icon: <SiHostinger />, color: "text-purple-500" },
    { name: "InfinityFree", icon: <PiInfinityBold />, color: "text-purple-400" },
    { name: "Ubuntu", icon: <SiUbuntu />, color: "text-orange-500" },
    { name: "Render", icon: <SiRender />, color: "text-blue-400" },
    { name: "Vercel", icon: <SiVercel />, color: "text-white" },
    { name: "Surge", icon: <LuZap />, color: "text-yellow-300" },
  ]
};

export const toolsSkills = {
  id: "tools",
  title: "Essential Utilities",
  subtitle: "My trusted toolkit for building, testing, and deploying applications",
  sectionTitle: "Development Tools",
  description: "These are the applications and services I use daily to design, develop, test, and deploy projects. From version control to prototyping, each tool plays a crucial role in my workflow.",
  learningText: "Always exploring new tools",
  accentColor: "amber",
  blobColors: ["blue-500", "purple-500", "amber-500"],
  skills: [
    { name: "Git", icon: <FaGitAlt />, color: "text-red-500" },
    { name: "GitHub", icon: <FaGithub />, color: "text-gray-400" },
    { name: "VSCode", icon: <SiVisualstudiocode />, color: "text-blue-500" },
    { name: "Figma", icon: <SiFigma />, color: "text-purple-500" },
    { name: "Canva", icon: <SiCanva />, color: "text-blue-400" },
    { name: "Android Studio", icon: <SiAndroidstudio />, color: "text-green-500" },
    { name: "Adobe XD", icon: <SiAdobexd />, color: "text-pink-500" },
    { name: "Arduino", icon: <SiArduino />, color: "text-teal-500" },
    { name: "Postman", icon: <SiPostman />, color: "text-orange-500" },
    { name: "Terminal", icon: <IoTerminal />, color: "text-gray-400" },
    { name: "Xcode", icon: <FaApple />, color: "text-gray-300" },
    { name: "TestFlight", icon: <AIIcons.TestFlight />, color: "text-sky-400" },
    { name: "ChatGPT", icon: <AIIcons.ChatGPT />, color: "text-green-400" },
    { name: "Claude", icon: <AIIcons.Claude />, color: "text-orange-300" },
    { name: "Gemini", icon: <AIIcons.Gemini />, color: "text-blue-300" },
    { name: "DeepSeek", icon: <AIIcons.DeepSeek />, color: "text-purple-400" },
  ]
};
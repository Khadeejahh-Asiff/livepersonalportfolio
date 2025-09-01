"use client";

import React, { useState, useRef } from "react";
import SectionHeading from "./section-heading";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import {
  FaRocket,
  FaBriefcase,
  FaTools,
  FaStar,
  FaGithub,
} from "react-icons/fa";

export default function About() {
  const { ref } = useSectionInView("About");
  const [activeTab, setActiveTab] = useState(0);
  // Fix: Change type from null to number | null
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  // Content for each tab
  const tabContent = [
    {
      icon: <FaRocket className="text-blue-500" />,
      emoji: "🚀",
      title: "Background",
      content:
        "🚀 Front-end Developer with a focus on responsive and high-performance web apps using React.js, Next.js, and Tailwind CSS. Passionate about clean UI, smooth UX, and shipping polished products. Currently working at InvoByte, always learning, always building.",
      color: "from-blue-500 to-indigo-600",
      darkColor: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-50",
      bgDark: "dark:bg-blue-900/20",
    },
    {
      icon: <FaBriefcase className="text-green-500" />,
      emoji: "💼",
      title: "Experience",
      content:
        "Currently at InvoByte building secure access control dashboards with Next.js, shadcn/ui & Tailwind. Previously worked at Tekvaly & Phenologix on platforms like ScrumDroid and Hiredroid using React.js and SWR. Delivered optimized UI and seamless data experiences.",
      color: "from-green-500 to-teal-600",
      darkColor: "from-green-600 to-teal-700",
      bgLight: "bg-green-50",
      bgDark: "dark:bg-green-900/20",
    },
    {
      icon: <FaTools className="text-amber-500" />,
      emoji: "🔧",
      title: "Skills",
      content:
        "React.js, Next.js, JavaScript (ES6+), Redux, Tailwind CSS, MUI, shadcn/ui, SWR, TypeScript, HTML5/CSS3, Responsive Design, React Bootstrap. I also work with GitHub, Postman, Swagger, and VS Code on the daily grind.",
      color: "from-amber-500 to-orange-600",
      darkColor: "from-amber-600 to-orange-700",
      bgLight: "bg-amber-50",
      bgDark: "dark:bg-amber-900/20",
    },
    {
      icon: <FaStar className="text-rose-500" />,
      emoji: "🌟",
      title: "Achievements",
      content:
        "Graduated with a 3.61 CGPA in Software Engineering from UCP. Developed high-impact production-level projects during internships and jobs. Delivered performance-optimized UIs and reusable components, proving both speed and code quality.",
      color: "from-rose-500 to-pink-600",
      darkColor: "from-rose-600 to-pink-700",
      bgLight: "bg-rose-50",
      bgDark: "dark:bg-rose-900/20",
    },
    {
      icon: <FaGithub className="text-purple-500" />,
      emoji: "👩‍💻",
      title: "Projects",
      content:
        "Check out my GitHub for projects like my personal portfolio built with React.js and Heartland Rehab built with Next.js and React Bootstrap. My work shows strong component architecture, responsive design, and third-party integrations.",
      color: "from-purple-500 to-violet-600",
      darkColor: "from-purple-600 to-violet-700",
      bgLight: "bg-purple-50",
      bgDark: "dark:bg-purple-900/20",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12 },
    },
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05 },
    hover: { scale: 1.03, y: -3 },
  };

  // Particle animation effect
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
  }));

  return (
    <section
      ref={ref}
      className="w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-12 flex flex-col gap-6"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 opacity-90"></div>

        {/* Animated particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400 dark:bg-blue-600 opacity-10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              x: [0, Math.random() * 15 - 7.5],
              y: [0, Math.random() * 15 - 7.5],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3 + Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content container with glass effect */}
      <div className="relative backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Decorative top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="p-8 sm:p-10">
          {/* Profile section */}
          <div ref={aboutRef} className="flex flex-col items-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={
                isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }
              }
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg"
            >
              {/* Add your profile image here */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                KA
              </div>
            </motion.div>

            <SectionHeading>About Me</SectionHeading>

            <motion.p
              variants={childVariants}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10"
            >
              Hi, I’m Khadeeja, a Front-end Developer specializing in React.js
              and Next.js. I build responsive, high-performance web applications
              with a strong focus on clean UI and smooth UX.
            </motion.p>
          </div>

          {/* Interactive tabs */}
          <div className="mb-10">
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
              variants={childVariants}
            >
              {tabContent.map((tab, index) => (
                <motion.button
                  key={index}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                            ${
                              activeTab === index
                                ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                                : `${tab.bgLight} ${tab.bgDark} text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white`
                            }`}
                  onClick={() => setActiveTab(index)}
                  onMouseEnter={() => setHoveredTab(index)}
                  onMouseLeave={() => setHoveredTab(null)}
                  variants={tabVariants}
                  animate={
                    activeTab === index
                      ? "active"
                      : hoveredTab === index
                        ? "hover"
                        : "inactive"
                  }
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.title}</span>

                  {/* Active indicator dot */}
                  {activeTab === index && (
                    <motion.span
                      className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-white"
                      layoutId="activeDot"
                      transition={{ type: "spring", bounce: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Content area with card effect */}
            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className={`relative p-6 sm:p-8 rounded-xl ${tabContent[activeTab].bgLight} ${tabContent[activeTab].bgDark} border border-gray-100 dark:border-gray-800 shadow-md`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Emoji decorative element */}
                  <div className="absolute -top-6 -right-4 text-5xl opacity-20 rotate-12 select-none pointer-events-none">
                    {tabContent[activeTab].emoji}
                  </div>

                  <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                    {tabContent[activeTab].content}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

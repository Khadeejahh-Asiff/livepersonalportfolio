"use client";

import React, { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaTwitter,
  FaHeart,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { TbBrandNextjs, TbBrandTypescript } from "react-icons/tb";
import { SiTailwindcss, SiJavascript } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);

  // Scroll to top function
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Tech stack with icons and names
  const techStack = [
    { name: "React", icon: <FaReact className="text-blue-400" /> },
    {
      name: "Next.js",
      icon: <TbBrandNextjs className="text-gray-700 dark:text-gray-200 " />,
    },
    {
      name: "TypeScript",
      icon: <TbBrandTypescript className="text-blue-600" />,
    },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  ];

  // Animation variants
  const hoverAnimation = {
    rest: { scale: 1 },
    hover: { scale: 1.15, y: -5 },
  };

  return (
    <footer className="relative pt-10 pb-6 sm:pt-16 sm:pb-10 overflow-hidden w-full px-2 sm:px-4 md:px-8">
      {/* Background gradient with wave */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0"></div>
        <svg
          className="absolute top-0 w-full text-white dark:text-gray-900"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile and Social Links */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile section with animated border */}
          <div className="relative mb-6">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 blur"></div>
            <div className="relative h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">KA</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Khadeeja Asif
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Front-end Developer
          </p>

          {/* Social links with hover effect */}
          <div className="flex justify-center space-x-4 mt-6">
            {[
              {
                icon: <FaLinkedin />,
                url: "https://www.linkedin.com/in/khadeejah-asif/",
                color: "bg-blue-500 hover:bg-blue-600",
              },
              {
                icon: <FaGithub />,
                url: "https://github.com/Khadeejahh-Asiff",
                color:
                  "bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700",
              },
              {
                icon: <FaEnvelope />,
                url: "mailto:khadeejaasif323@gmail.com",
                color: "bg-red-500 hover:bg-red-600",
              },
              {
                icon: <FaTwitter />,
                url: "https://twitter.com",
                color: "bg-blue-400 hover:bg-blue-500",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 ${social.color} rounded-full shadow-lg text-white transform transition-all duration-300`}
                variants={hoverAnimation}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Tech stack display with enhanced animations */}
        <motion.div
          className="mt-12 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-center text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">
            <span className="relative">
              Tech Stack
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></span>
            </span>
          </h4>

          <div className="flex flex-wrap justify-center gap-5">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredTech(index)}
                onMouseLeave={() => setHoveredTech(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <motion.div
                  className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center cursor-pointer border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.15, y: -5 }}
                >
                  <div className="text-2xl">{tech.icon}</div>
                </motion.div>

                <AnimatePresence>
                  {hoveredTech === index && (
                    <motion.div
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white text-xs py-1 px-3 rounded-md shadow-lg whitespace-nowrap z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      {tech.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider with shine effect */}
        <div className="relative w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent my-10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-20 h-full bg-white opacity-40"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
          />
        </div>

        {/* Copyright section */}
        <div className="text-center">
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <span className="mx-2 inline-block">
              <motion.span
                className="text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FaHeart />
              </motion.span>
            </span>
            <span>by Khadeeja Asif</span>
          </div>
          <p className="mt-2 text-gray-500 dark:text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
  FaTags,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaStar,
} from "react-icons/fa";
import Link from "next/link";

type ProjectProps = (typeof projectsData)[number] & {
  index: number;
};

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  liveUrl,
  id,
  index,
  keyFeatures,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  // Decide if project is even or odd numbered
  const isEven = index % 2 === 1;

  // Get complementary icon for the project based on first tag
  const getProjectIcon = () => {
    const firstTag = tags[0]?.toLowerCase() || "";
    if (firstTag.includes("mobile") || firstTag.includes("app")) {
      return <FaMobileAlt className="text-xl" />;
    } else if (firstTag.includes("backend") || firstTag.includes("api")) {
      return <FaServer className="text-xl" />;
    }
    return <FaLaptopCode className="text-xl" />;
  };

  // Get a color theme based on the project index
  const getColorTheme = () => {
    const themes = [
      {
        accent: "from-blue-500 to-indigo-600",
        lightGradient: "from-blue-50 to-indigo-50",
        darkGradient: "from-blue-900/20 to-indigo-900/20",
        badgeBg: "bg-blue-50 dark:bg-blue-900/20",
        badgeText: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/10",
        shadowColor: "shadow-blue-500/20 dark:shadow-blue-400/10",
        borderAccent: "border-blue-200 dark:border-blue-800",
      },
      {
        accent: "from-purple-500 to-pink-600",
        lightGradient: "from-purple-50 to-pink-50",
        darkGradient: "from-purple-900/20 to-pink-900/20",
        badgeBg: "bg-purple-50 dark:bg-purple-900/20",
        badgeText: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-100 dark:bg-purple-900/30",
        hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/10",
        shadowColor: "shadow-purple-500/20 dark:shadow-purple-400/10",
        borderAccent: "border-purple-200 dark:border-purple-800",
      },
      {
        accent: "from-emerald-500 to-teal-600",
        lightGradient: "from-emerald-50 to-teal-50",
        darkGradient: "from-emerald-900/20 to-teal-900/20",
        badgeBg: "bg-emerald-50 dark:bg-emerald-900/20",
        badgeText: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-900/10",
        shadowColor: "shadow-emerald-500/20 dark:shadow-emerald-400/10",
        borderAccent: "border-emerald-200 dark:border-emerald-800",
      },
      {
        accent: "from-amber-500 to-orange-600",
        lightGradient: "from-amber-50 to-orange-50",
        darkGradient: "from-amber-900/20 to-orange-900/20",
        badgeBg: "bg-amber-50 dark:bg-amber-900/20",
        badgeText: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-100 dark:bg-amber-900/30",
        hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-900/10",
        shadowColor: "shadow-amber-500/20 dark:shadow-amber-400/10",
        borderAccent: "border-amber-200 dark:border-amber-800",
      },
    ];

    return themes[index % themes.length];
  };

  const colorTheme = getColorTheme();

  // Content sections for tabs
  const tabContent = [
    { id: "overview", label: "Overview", content: description },
    { id: "features", label: "Key Features", content: keyFeatures },
    { id: "tech", label: "Technologies", content: tags.join(", ") },
  ];

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="relative group py-8 my-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative elements */}
      <motion.div
        className={`absolute -z-10 inset-0 bg-gradient-to-br ${colorTheme.lightGradient} dark:${colorTheme.darkGradient} opacity-0 rounded-3xl`}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Project number badge */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          className={`w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${colorTheme.accent} text-white font-bold text-2xl shadow-lg ${colorTheme.shadowColor} border-4 border-white dark:border-gray-900`}
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{
            scale: isVisible ? 1 : 0.8,
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20,
          }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            scale: 1.1,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          {(index + 1).toString().padStart(2, "0")}
        </motion.div>
      </div>

      <motion.section
        className={`relative bg-white dark:bg-gray-900 max-w-5xl mx-auto rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl ${colorTheme.shadowColor} transition-all duration-500`}
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : 100,
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Top accent bar with shine effect */}
        <div
          className={`relative h-2 w-full bg-gradient-to-r ${colorTheme.accent} overflow-hidden`}
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-white opacity-30"
            animate={{ x: ["-100%", "500%"] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "linear",
              repeatDelay: 1,
            }}
          />
        </div>

        {/* Background elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl"></div>

        <div className="relative p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10">
            {/* Image Section with enhanced visual treatments - hidden on mobile */}
            <div
              className={`relative overflow-hidden rounded-2xl shadow-xl ${colorTheme.shadowColor} h-full transform transition-transform duration-700 ${isHovered ? "lg:scale-[1.02]" : ""} ${isEven ? "lg:order-last" : "lg:order-first"} hidden md:block`}
            >
              {/* Simple border frame */}
              <div className="absolute inset-0 border border-white/30 dark:border-gray-700/30 rounded-2xl z-10 pointer-events-none" />

              {/* Corner accent */}
              <div
                className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${colorTheme.accent} opacity-30 blur-xl z-0`}
              />

              {/* This container maintains consistent height */}
              <div className="relative h-full min-h-[350px]">
                <Image
                  src={imageUrl}
                  alt={`Screenshot of ${title} project`}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                  className="transition-all duration-500"
                />

                {/* Featured badge */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-amber-600 dark:text-amber-400 text-xs font-medium rounded-full shadow-md border border-amber-200 dark:border-amber-800/50">
                    <FaStar className="text-amber-500" />
                    <span>Featured Project</span>
                  </div>
                )}

                {/* Overlay with buttons on hover - enhanced */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end justify-center p-8 transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {githubUrl && (
                      <motion.a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-white/90 hover:bg-white text-gray-900 rounded-xl font-medium text-sm flex items-center justify-center sm:justify-start space-x-2 transition-all duration-300 backdrop-blur-sm"
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 20,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <FaGithub className="mr-2 text-lg" />
                        <span>View Source Code</span>
                      </motion.a>
                    )}

                    {liveUrl && (
                      <motion.a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-5 py-3 bg-gradient-to-r ${colorTheme.accent} text-white rounded-xl font-medium text-sm flex items-center justify-center sm:justify-start space-x-2 transition-all duration-300 shadow-lg ${colorTheme.shadowColor}`}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 20,
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        <span>View Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section - Enhanced */}
            <div className="flex flex-col h-full w-full">
              {/* Project type and title - with enhanced styling */}
              <div className="flex items-start space-x-4 mb-6">
                <div
                  className={`p-3 rounded-xl ${colorTheme.iconBg} ${colorTheme.shadowColor} shadow-md`}
                >
                  {getProjectIcon()}
                </div>
                <div>
                  <motion.div
                    className={`text-xs font-semibold uppercase tracking-wider ${colorTheme.badgeText} flex items-center`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      x: isVisible ? 0 : -20,
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <span
                      className={`inline-block w-6 h-0.5 mr-2 bg-gradient-to-r ${colorTheme.accent}`}
                    ></span>
                    {tags[0] || "Project"}
                  </motion.div>
                  <motion.h3
                    className="text-3xl font-bold text-gray-800 dark:text-white mt-2 font-heading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      y: isVisible ? 0 : 20,
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {title}
                  </motion.h3>
                </div>
              </div>

              {/* Tab navigation - enhanced styling */}
              <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-6">
                {tabContent.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`py-3 px-5 text-sm font-medium transition-all duration-300 relative rounded-t-lg ${
                      activeTab === idx
                        ? `${colorTheme.badgeText} ${colorTheme.badgeBg} border-t border-l border-r ${colorTheme.borderAccent} border-b-0`
                        : `text-gray-100 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300 ${colorTheme.hoverBg}`
                    }`}
                  >
                    {tab.label}
                    {activeTab === idx && (
                      <motion.div
                        layoutId={`tab-indicator-${id}`}
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colorTheme.accent}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content - improved animation and styling */}
              <div className="flex-grow mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                  >
                    {activeTab === 1 &&
                    Array.isArray(tabContent[activeTab].content) ? (
                      <ul className="list-disc pl-5">
                        {tabContent[activeTab].content.map(
                          (feature: string, idx: number) => (
                            <li key={idx}>{feature}</li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p>{tabContent[activeTab].content}</p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tags grid - visually enhanced */}
              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`p-1.5 rounded-md ${colorTheme.iconBg}`}>
                    <FaTags className={`text-xs ${colorTheme.badgeText}`} />
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    TECHNOLOGIES
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: tagIndex * 0.05 + 0.3,
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full ${colorTheme.badgeBg} ${colorTheme.badgeText} border ${colorTheme.borderAccent} transition-all duration-300 hover:shadow-md ${colorTheme.shadowColor}`}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* View details button - enhanced */}
              <Link
                href={`/projects/${id}`}
                className={`mt-8 self-start flex items-center gap-2 px-5 py-3 text-sm font-medium border ${colorTheme.borderAccent} rounded-xl ${colorTheme.badgeText} bg-gradient-to-br ${colorTheme.badgeBg} backdrop-blur-sm transition-all duration-300 hover:shadow-md ${colorTheme.shadowColor} group`}
              >
                View Project Details
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br ${colorTheme.accent} text-white transition-all duration-300 group-hover:w-7`}
                >
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

// Animated Tab Content Component
// function AnimatedTabContent({ activeTab, content }: { activeTab: number; content: string }) {
//   return (
//     <motion.div
//       key={activeTab}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3 }}
//       className="text-gray-600 dark:text-gray-300 leading-relaxed"
//     >
//       <p>{content}</p>
//     </motion.div>
//   );
// }

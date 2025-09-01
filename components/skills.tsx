"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaTools,
  FaPeopleCarry,
  FaStar,
  FaRegStar,
  FaAws,
} from "react-icons/fa";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { TbBrandReactNative } from "react-icons/tb";
import { SiOpenai } from "react-icons/si";
import "react-circular-progressbar/dist/styles.css";

// Icon mapping based on categories with more modern icons
const iconMapping = {
  "Frontend Development": (
    <TbBrandReactNative className="text-4xl text-blue-500" />
  ),
  "Backend Development": <FaDatabase className="text-4xl text-green-500" />,
  "Programming Languages": <FaCode className="text-4xl text-purple-500" />,
  "Tools & Technologies": <FaTools className="text-4xl text-amber-500" />,
  "Professional Skills": <FaPeopleCarry className="text-4xl text-rose-500" />,
  "AI & ML Development": <SiOpenai className="text-4xl text-indigo-500" />,
  "DevOps & Cloud": <FaAws className="text-4xl text-teal-500" />,
};

// Background gradient mapping for each category
const gradientMapping = {
  "Frontend Development":
    "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
  "Backend Development":
    "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
  "Programming Languages":
    "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
  "Tools & Technologies":
    "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
  "Professional Skills":
    "from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20",
  "AI & ML Development":
    "from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
  "DevOps & Cloud":
    "from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20",
};

// Border color mapping for each category
const borderMapping = {
  "Frontend Development": "border-blue-200 dark:border-blue-800",
  "Backend Development": "border-green-200 dark:border-green-800",
  "Programming Languages": "border-purple-200 dark:border-purple-800",
  "Tools & Technologies": "border-amber-200 dark:border-amber-800",
  "Professional Skills": "border-rose-200 dark:border-rose-800",
  "AI & ML Development": "border-indigo-200 dark:border-indigo-800",
  "DevOps & Cloud": "border-teal-200 dark:border-teal-800",
};

// Animation for skill cards
const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills", 0);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Function to toggle expanded category view
  const toggleCategory = (categoryIndex: number) => {
    if (expandedCategory === categoryIndex) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryIndex);
    }
  };

  // Convert proficiency percentage to star rating (out of 5)
  const getStarRating = (proficiency: number) => {
    const stars = Math.round(proficiency / 20);
    return stars;
  };

  // Filter skill categories based on active filter
  const filteredSkills =
    activeFilter === "All"
      ? skillsData
      : skillsData.filter((category) => category.category === activeFilter);

  // Get unique category names for filter tabs
  const categories = [
    "All",
    ...skillsData.map((category) => category.category),
  ];

  // Get top skills across all categories for summary
  const getTopSkills = () => {
    const allSkills = skillsData.flatMap((category) =>
      category.skills.map((skill) => ({
        ...skill,
        category: category.category,
      }))
    );

    return allSkills.sort((a, b) => b.proficiency - a.proficiency).slice(0, 5);
  };

  const topSkills = getTopSkills();

  return (
    <section
      ref={ref}
      className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-12 flex flex-col gap-6"
    >
      <SectionHeading>Skills & Expertise</SectionHeading>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-[42rem] mx-auto">
        My technical expertise lies in front-end development, with a strong
        command over tools like React.js, Next.js, Tailwind CSS, and shadcn/ui.
        I build responsive, performant, and scalable web applications from
        concept to deployment.
      </p>

      {/* Top skills spotlight */}
      <motion.div
        className="mb-10 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Top Expertise
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {topSkills.map((skill, index) => (
            <div
              key={index}
              className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-2"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {skill.name}
              </span>
              <div className="flex">
                {[...Array(5)].map((_, i) =>
                  i < getStarRating(skill.proficiency) ? (
                    <FaStar key={i} className="text-yellow-500 text-xs" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-400 text-xs" />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((category, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${
                activeFilter === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {filteredSkills.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            className={`relative bg-gradient-to-br ${gradientMapping[category.category as keyof typeof gradientMapping] || "from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50"} 
                      ${borderMapping[category.category as keyof typeof borderMapping] || "border-gray-200 dark:border-gray-700"} 
                      border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition
                      overflow-hidden`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              animate: {
                opacity: 1,
                scale: 1,
                transition: { delay: 0.1 * categoryIndex, duration: 0.5 },
              },
            }}
          >
            {/* Category Icon & Header with Glass Effect */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md">
                  {iconMapping[
                    category.category as keyof typeof iconMapping
                  ] || <FaTools className="text-3xl text-gray-500" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {category.category}
                </h3>
              </div>
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label={
                  expandedCategory === categoryIndex
                    ? "Collapse section"
                    : "Expand section"
                }
              >
                {expandedCategory === categoryIndex ? (
                  <MdOutlineExpandLess className="text-xl text-gray-600 dark:text-gray-300" />
                ) : (
                  <MdOutlineExpandMore className="text-xl text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            {/* Top Skills Preview (always visible) */}
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {category.skills.slice(0, 4).map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2"
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {skill.name}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) =>
                      i < getStarRating(skill.proficiency) ? (
                        <FaStar key={i} className="text-yellow-500 text-sm" />
                      ) : (
                        <FaRegStar key={i} className="text-gray-400 text-sm" />
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Expanded View with All Skills */}
            {expandedCategory === categoryIndex &&
              category.skills.length > 4 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {category.skills.slice(4).map((skill, index) => (
                    <motion.div
                      key={index + 4}
                      className="flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-sm"
                      variants={fadeInAnimationVariants}
                      initial="initial"
                      animate="animate"
                      custom={index + 4}
                    >
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {skill.name}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) =>
                          i < getStarRating(skill.proficiency) ? (
                            <FaStar
                              key={i}
                              className="text-yellow-500 text-sm"
                            />
                          ) : (
                            <FaRegStar
                              key={i}
                              className="text-gray-400 text-sm"
                            />
                          )
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

            {/* Decorative Elements - Geometric Shapes */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 rounded-full bg-gradient-to-tr from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 blur-xl pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {/* Skills Summary Banner */}
      <motion.div
        className="mt-16 p-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold mb-2">
          Always Learning, Always Growing
        </h3>
        <p className="opacity-90">
          My skill set continues to evolve as I explore new technologies and
          methodologies. I'm passionate about staying at the forefront of
          industry best practices.
        </p>
      </motion.div>
    </section>
  );
}

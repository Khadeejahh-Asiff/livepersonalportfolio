"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaFilter } from "react-icons/fa";

type Project = (typeof projectsData)[number];

// PaginationButton Component defined outside the main component
const PaginationButton = ({
  index,
  currentPage,
  onClick,
}: {
  index: number;
  currentPage: number;
  onClick: () => void;
}) => {
  const isActive = currentPage === index;

  return (
    <motion.button
      onClick={onClick}
      className={`relative w-8 h-8 mx-1 rounded-full overflow-hidden flex items-center justify-center`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background with gradient for active state */}
      <motion.div
        className={`absolute inset-0 z-0 ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-indigo-600"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
        animate={{
          scale: isActive ? [0.8, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />

      {/* Number */}
      <span
        className={`relative z-10 text-sm font-medium ${
          isActive ? "text-white" : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {index + 1}
      </span>
    </motion.button>
  );
};

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(0);

  // Get unique tags from all projects
  const allTags = [
    "All",
    ...Array.from(new Set(projectsData.flatMap((project) => project.tags))),
  ];

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((project: Project) =>
          Array.from(project.tags).includes(activeFilter as any)
        );

  // Calculate total pages
  const projectsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get current page's projects
  const currentProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  // Handle pagination
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      // Scroll back to projects section top
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  return (
    <section
      ref={ref}
      className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-12 flex flex-col gap-6"
    >
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute -top-40 -right-20 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <SectionHeading>My Projects</SectionHeading>

        <motion.p
          className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dive into the projects I’ve built, both professionally and personally.
          Whether it’s building scalable dashboards or crafting sleek UIs with
          React and Next.js, each project highlights my development workflow,
          design decisions, and technical toolkit.
        </motion.p>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="flex items-center mr-2 text-gray-500 dark:text-gray-400">
            <FaFilter className="mr-2" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {allTags.map((tag, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  activeFilter === tag
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              onClick={() => {
                setActiveFilter(tag);
                setCurrentPage(0);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20 mt-4"
        >
          {currentProjects.length > 0 ? (
            currentProjects.map((project, index) => (
              <React.Fragment key={index}>
                <Project {...project} index={index} />
              </React.Fragment>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">
                No projects match the selected filter.
              </p>
            </div>
          )}
        </motion.div>

        {/* Enhanced Pagination controls */}
        {filteredProjects.length > projectsPerPage && (
          <motion.div
            className="flex flex-col items-center gap-4 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Page indicator text */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Page {currentPage + 1} of {totalPages}
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md">
              {/* Previous button with gradient hover */}
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-full
                  ${
                    currentPage === 0
                      ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                whileHover={currentPage !== 0 ? { scale: 1.05 } : {}}
                whileTap={currentPage !== 0 ? { scale: 0.95 } : {}}
              >
                {/* Hover background effect */}
                {currentPage !== 0 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full z-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10">
                  <FaArrowLeft />
                </span>
              </motion.button>

              {/* Page number buttons */}
              <div className="flex items-center">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  // Show ellipsis for many pages
                  if (totalPages > 5) {
                    // Always show first, last, current, and adjacent pages
                    if (
                      idx === 0 ||
                      idx === totalPages - 1 ||
                      idx === currentPage ||
                      idx === currentPage - 1 ||
                      idx === currentPage + 1
                    ) {
                      return (
                        <PaginationButton
                          key={idx}
                          index={idx}
                          currentPage={currentPage}
                          onClick={() => {
                            setCurrentPage(idx);
                            document
                              .getElementById("projects")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                        />
                      );
                    } else if (
                      (idx === currentPage - 2 && currentPage > 1) ||
                      (idx === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      // Show ellipsis
                      return (
                        <div key={idx} className="w-8 text-center">
                          <span className="text-gray-500 dark:text-gray-400">
                            ...
                          </span>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  }

                  // Show all pages if 5 or fewer
                  return (
                    <PaginationButton
                      key={idx}
                      index={idx}
                      currentPage={currentPage}
                      onClick={() => {
                        setCurrentPage(idx);
                        document
                          .getElementById("projects")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    />
                  );
                })}
              </div>

              {/* Next button with gradient hover */}
              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-full
                  ${
                    currentPage === totalPages - 1
                      ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                whileHover={
                  currentPage !== totalPages - 1 ? { scale: 1.05 } : {}
                }
                whileTap={currentPage !== totalPages - 1 ? { scale: 0.95 } : {}}
              >
                {/* Hover background effect */}
                {currentPage !== totalPages - 1 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full z-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10">
                  <FaArrowRight />
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

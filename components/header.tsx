"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTheme } from "@/context/theme-context";
import { FaCode } from "react-icons/fa";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import type { SectionName } from "@/lib/types";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check for scroll position to add effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[999]">
      {/* Enhanced colorful top border with multiple blur and glow effects */}
      <div className="h-[3px] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-sm opacity-50 animate-pulse"></div>
      </div>
      {/* Main header container - responsive padding and stacking */}
      <motion.div
        className={`w-full ${
          isScrolled
            ? "bg-white/80 dark:bg-[#18181B]/80 shadow-lg backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
            : "bg-transparent"
        } transition-all duration-300 flex flex-row items-center justify-between px-2 sm:px-4 md:px-12 md:py-4 lg:px-24 xl:px-32 py-2`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        {/* Logo and navigation for desktop - perfectly aligned */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base sm:text-lg md:text-xl lg:text-2xl"
          >
            <FaCode className="text-blue-500" />
            <span className="hidden sm:inline">Khadeeja</span>
          </Link>
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-4 sm:gap-6 lg:gap-10 xl:gap-12">
            <ul className="flex items-center space-x-4">
              {links.map((link, index) => (
                <NavItem
                  key={link.hash}
                  link={link}
                  index={index}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  setTimeOfLastClick={setTimeOfLastClick}
                  theme={theme}
                />
              ))}
            </ul>
          </nav>
        </div>

        {/* Theme switch and mobile menu button */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === "light"
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-lg"
              }`}
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <RiMoonClearLine className="text-xl" />
              ) : (
                <RiSunLine className="text-xl" />
              )}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 ${theme === "light" ? "bg-gray-900" : "bg-white"} transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : "mb-1.5"}`}
            ></span>
            <span
              className={`block h-0.5 w-6 ${theme === "light" ? "bg-gray-900" : "bg-white"} transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "mb-1.5"}`}
            ></span>
            <span
              className={`block h-0.5 w-6 ${theme === "light" ? "bg-gray-900" : "bg-white"} transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </button>
        </div>
      </motion.div>

      {/* Mobile menu overlay - improved for mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="fixed top-0 left-0 w-full h-full bg-white dark:bg-[#18181B] z-[1000] flex flex-col items-center justify-center gap-6 sm:gap-8 text-base sm:text-lg px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-center justify-center flex-1 w-full">
              <ul className="flex flex-col items-center space-y-6 w-full">
                {links.map((link, index) => (
                  <motion.li
                    key={link.hash}
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.hash}
                      className={`block text-center py-3 text-lg font-medium rounded-md transition-all duration-300 ${
                        activeSection === link.name
                          ? theme === "light"
                            ? "text-gray-900 bg-gray-100 border border-gray-200"
                            : "text-white bg-gray-800 border border-gray-700"
                          : theme === "light"
                            ? "text-gray-700 bg-gray-50 border border-gray-100 hover:bg-gray-100"
                            : "text-gray-400 bg-gray-900 border border-gray-800 hover:bg-gray-800 hover:text-white"
                      }`}
                      onClick={() => {
                        setActiveSection(link.name);
                        setTimeOfLastClick(Date.now());
                        setMobileMenuOpen(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// Nav Item Component
type NavItemProps = {
  link: { name: string; hash: string };
  index: number;
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  setTimeOfLastClick: (time: number) => void;
  theme: string;
};

const NavItem = ({
  link,
  index,
  activeSection,
  setActiveSection,
  setTimeOfLastClick,
  theme,
}: NavItemProps) => {
  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <Link
        href={link.hash}
        className={`relative px-3 py-2 rounded-full font-medium transition-all duration-300 ${
          activeSection === link.name
            ? theme === "light"
              ? "text-gray-900"
              : "text-white"
            : theme === "light"
              ? "text-gray-600 hover:text-gray-900"
              : "text-gray-400 hover:text-gray-200"
        }`}
        onClick={() => {
          setActiveSection(link.name as SectionName);
          setTimeOfLastClick(Date.now());
        }}
      >
        {activeSection === link.name && (
          <motion.span
            className={`absolute inset-0 -z-10 rounded-full ${
              theme === "light"
                ? "bg-gray-100 border-gray-200/70"
                : "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20"
            }`}
            layoutId="activeSection"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          />
        )}
        {link.name}
      </Link>
    </motion.li>
  );
};

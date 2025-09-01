"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaExclamationTriangle,
  FaCheck,
  FaUser,
  FaLock,
} from "react-icons/fa";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formState, setFormState] = useState("idle"); // idle, loading, success, error
  const [characterCount, setCharacterCount] = useState(0);
  const [floatingLabels, setFloatingLabels] = useState({
    name: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    setCharacterCount(message.length);
  }, [message]);

  // Update floating label state based on input content
  useEffect(() => {
    setFloatingLabels({
      name: name.length > 0,
      email: senderEmail.length > 0,
      message: message.length > 0,
    });
  }, [name, senderEmail, message]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setFormState("loading");

    if (!isValidEmail(senderEmail)) {
      setError("Please enter a valid email address.");
      setFormState("error");
      return;
    }

    if (message.length === 0) {
      setError("Message cannot be empty.");
      setFormState("error");
      return;
    }

    if (message.length > 50000) {
      setError("Message cannot exceed 50000 characters.");
      setFormState("error");
      return;
    }

    const formData = { senderName: name, senderEmail, message };

    try {
      const { error: responseError } = await sendEmail(formData);

      if (responseError) {
        toast.error(responseError);
        setFormState("error");
        return;
      }

      setName("");
      setSenderEmail("");
      setMessage("");
      setCharacterCount(0);
      setFloatingLabels({ name: false, email: false, message: false });
      setFormState("success");
      toast.success("Email sent successfully!");

      // Reset form state after showing success
      setTimeout(() => {
        setFormState("idle");
      }, 3000);
    } catch (err) {
      console.error("Error sending email:", err);
      setFormState("error");
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section
      ref={ref}
      className="w-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-12 flex flex-col gap-6"
    >
      {/* Background Elements with enhanced visuals */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 opacity-60"></div>

        {/* Enhanced decorative elements */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-20"></div>

        {/* Animated decorative particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500 opacity-30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * 100 + "%"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 15,
              ease: "linear",
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.015] dark:opacity-[0.03]"></div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-800/50 rounded-3xl shadow-xl overflow-hidden"
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Glowing top bar with gradient animation */}
        <div className="relative h-2 w-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"></div>
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

        <div className="p-8 sm:p-10">
          {/* Heading with enhanced icon animation */}
          <div className="flex flex-col items-center justify-center mb-10">
            <motion.div
              className="mb-5 p-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            >
              <FaEnvelope className="text-2xl text-blue-600 dark:text-blue-400" />
            </motion.div>
            <SectionHeading>Get in Touch</SectionHeading>
          </div>

          <motion.p
            className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I'm always open to new opportunities and collaborations. Reach out
            directly at{" "}
            <a
              className="relative inline-block group text-blue-600 dark:text-blue-400 font-medium"
              href="mailto:khadeejaasif323@gmail.com"
            >
              khadeejaasif323@gmail.com
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>{" "}
            or fill out the form below.
          </motion.p>

          {/* Social media links with enhanced styling */}
          <motion.div
            className="flex justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              {
                icon: <FaLinkedin />,
                url: "https://www.linkedin.com/in/khadeejah-asif/",
                bgClass: "from-blue-600 to-blue-700",
                hoverClass: "from-blue-700 to-blue-800",
              },
              {
                icon: <FaGithub />,
                url: "https://github.com/Khadeejahh-Asiff",
                bgClass: "from-gray-700 to-gray-800",
                hoverClass: "from-gray-800 to-gray-900",
              },
              {
                icon: <FaTwitter />,
                url: "https://twitter.com",
                bgClass: "from-blue-400 to-blue-500",
                hoverClass: "from-blue-500 to-blue-600",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-gradient-to-br ${social.bgClass} hover:bg-gradient-to-br hover:${social.hoverClass} rounded-full text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Form container with enhanced visuals */}
          <motion.div
            className="relative rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200/80 dark:border-gray-700/80 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Success overlay with enhanced animation */}
            <AnimatePresence>
              {formState === "success" && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                    transition={{ type: "spring", damping: 8 }}
                    className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center mb-5 shadow-md"
                  >
                    <FaCheck className="text-3xl text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              className="flex flex-col p-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name input with floating label */}
                <div className="relative group">
                  <motion.label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400 ${
                      floatingLabels.name
                        ? "text-xs top-2"
                        : "text-base top-1/2 -translate-y-1/2"
                    }`}
                    animate={{
                      top: floatingLabels.name ? 8 : "50%",
                      y: floatingLabels.name ? 0 : "-50%",
                      fontSize: floatingLabels.name ? "0.75rem" : "1rem",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="flex items-center gap-2">
                      <FaUser
                        className={
                          floatingLabels.name ? "text-xs" : "text-base"
                        }
                      />
                      Your Name
                    </span>
                  </motion.label>

                  <input
                    id="name"
                    className="w-full h-14 px-4 pt-5 pb-2 rounded-xl bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 transition-all"
                    name="name"
                    type="text"
                    maxLength={100}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    onFocus={() =>
                      setFloatingLabels((prev) => ({ ...prev, name: true }))
                    }
                    onBlur={() =>
                      setFloatingLabels((prev) => ({
                        ...prev,
                        name: name.length > 0,
                      }))
                    }
                  />
                </div>

                {/* Email input with floating label */}
                <div className="relative group">
                  <motion.label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400 ${
                      floatingLabels.email
                        ? "text-xs top-2"
                        : "text-base top-1/2 -translate-y-1/2"
                    }`}
                    animate={{
                      top: floatingLabels.email ? 8 : "50%",
                      y: floatingLabels.email ? 0 : "-50%",
                      fontSize: floatingLabels.email ? "0.75rem" : "1rem",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="flex items-center gap-2">
                      <FaEnvelope
                        className={
                          floatingLabels.email ? "text-xs" : "text-base"
                        }
                      />
                      Your Email
                    </span>
                  </motion.label>

                  <input
                    id="email"
                    className="w-full h-14 px-4 pt-5 pb-2 rounded-xl bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 transition-all"
                    name="senderEmail"
                    type="email"
                    required
                    maxLength={500}
                    value={senderEmail}
                    onChange={(e) => {
                      setSenderEmail(e.target.value);
                      setError("");
                    }}
                    onFocus={() =>
                      setFloatingLabels((prev) => ({ ...prev, email: true }))
                    }
                    onBlur={() =>
                      setFloatingLabels((prev) => ({
                        ...prev,
                        email: senderEmail.length > 0,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Message textarea with floating label and character count */}
              <div className="relative mb-3 group">
                <motion.label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400 ${
                    floatingLabels.message ? "text-xs top-2" : "text-base top-6"
                  }`}
                  animate={{
                    top: floatingLabels.message ? 8 : 24,
                    fontSize: floatingLabels.message ? "0.75rem" : "1rem",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="flex items-center gap-2">
                    <FaPaperPlane
                      className={
                        floatingLabels.message ? "text-xs" : "text-base"
                      }
                    />
                    Your Message
                  </span>
                </motion.label>

                <textarea
                  id="message"
                  className="w-full h-52 px-4 pt-6 pb-2 rounded-xl bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 transition-all resize-none"
                  name="message"
                  required
                  maxLength={50000}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setError("");
                  }}
                  onFocus={() =>
                    setFloatingLabels((prev) => ({ ...prev, message: true }))
                  }
                  onBlur={() =>
                    setFloatingLabels((prev) => ({
                      ...prev,
                      message: message.length > 0,
                    }))
                  }
                />

                {/* Character count with gradient progress */}
                <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <div className="w-24 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      style={{
                        width: `${Math.min((characterCount / 50000) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <span>{characterCount} / 50000</span>
                </div>
              </div>

              {/* Error message with enhanced animation */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3 text-red-700 dark:text-red-400"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center">
                      <FaExclamationTriangle />
                    </div>
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button - either use your existing component or replace with enhanced version */}
              <div className="mt-3">
                <SubmitBtn />
              </div>

              {/* Privacy note */}
              <div className="mt-5 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                <FaLock className="text-gray-400" />
                <span>
                  Your information is secured and never shared with third
                  parties
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

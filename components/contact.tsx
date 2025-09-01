"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope,
  FaPaperPlane,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    senderEmail: "",
    message: "",
  });
  const [charCount, setCharCount] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => setMounted(true), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "message") setCharCount(value.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.senderEmail || !formData.message) {
      toast.error("Please fill in all fields ✍️");
      return;
    }

    setIsSending(true);
    try {
      await sendEmail(formData);
      setIsSubmitted(true);
      toast.success("Message sent successfully");
      setFormData({ name: "", senderEmail: "", message: "" });
      setCharCount(0);
    } catch {
      toast.error("Something went wrong. Please try again");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      ref={ref}
      className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12 flex flex-col gap-6"
    >
      <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-4 sm:p-8 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Get In Touch
          </h2>
          <p className="mt-2 sm:mt-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Have a project idea, question, or just want to connect? Drop me a
            message ✨
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4 sm:space-y-6 relative z-10"
        >
          {/* Name */}
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 sm:h-14 px-3 sm:px-4 pt-5 pb-2 rounded-lg sm:rounded-xl 
              bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 
              text-sm sm:text-base text-gray-800 dark:text-gray-200 
              placeholder-transparent focus:outline-none 
              focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 transition-all"
              placeholder="Your Name"
            />
            <label
              htmlFor="name"
              className={`absolute left-3 sm:left-4 top-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 
                transition-all pointer-events-none ${
                  formData.name
                    ? "-translate-y-3 sm:-translate-y-4 scale-90"
                    : ""
                }`}
            >
              Your Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              id="senderEmail"
              name="senderEmail"
              type="email"
              value={formData.senderEmail}
              onChange={handleChange}
              className="w-full h-12 sm:h-14 px-3 sm:px-4 pt-5 pb-2 rounded-lg sm:rounded-xl 
              bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 
              text-sm sm:text-base text-gray-800 dark:text-gray-200 
              placeholder-transparent focus:outline-none 
              focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 transition-all"
              placeholder="Your Email"
            />
            <label
              htmlFor="senderEmail"
              className={`absolute left-3 sm:left-4 top-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 
                transition-all pointer-events-none ${
                  formData.senderEmail
                    ? "-translate-y-3 sm:-translate-y-4 scale-90"
                    : ""
                }`}
            >
              Your Email
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
              className="w-full h-40 sm:h-52 px-3 sm:px-4 pt-6 pb-2 rounded-lg sm:rounded-xl 
              bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 
              text-sm sm:text-base text-gray-800 dark:text-gray-200 
              placeholder-transparent focus:outline-none 
              focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-600/40 transition-all resize-none"
              placeholder="Your Message"
            />
            <label
              htmlFor="message"
              className={`absolute left-3 sm:left-4 top-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 
                transition-all pointer-events-none ${
                  formData.message
                    ? "-translate-y-2 sm:-translate-y-3 scale-90"
                    : ""
                }`}
            >
              Your Message
            </label>

            {/* Character counter */}
            <div
              className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 
              text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 sm:gap-2"
            >
              <div className="w-16 sm:w-24 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-1 bg-blue-500 dark:bg-blue-400 transition-all"
                  style={{ width: `${(charCount / 500) * 100}%` }}
                />
              </div>
              {charCount}/500
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={isSending}
            type="submit"
            className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl 
            bg-blue-600 text-white font-medium text-sm sm:text-base 
            hover:bg-blue-700 focus:outline-none focus:ring-2 
            focus:ring-blue-500/40 disabled:opacity-70 flex items-center justify-center gap-x-6 mx-auto"
          >
            {isSending ? (
              "Sending..."
            ) : isSubmitted ? (
              "Sent!"
            ) : (
              <>
                Send Message <FaPaperPlane size={16} />
              </>
            )}
          </motion.button>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-row justify-center gap-x-6 mb-6 sm:mb-10"
          >
            {[
              { Icon: FaGithub, href: "https://github.com/Khadeejahh-Asiff" },
              {
                Icon: FaLinkedin,
                href: "https://linkedin.com/in/khadeejah-asif",
              },
              { Icon: FaTwitter, href: "https://twitter.com/" },
              { Icon: FaEnvelope, href: "mailto:khadeejaasif323@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-full bg-gray-50 dark:bg-gray-900/30 
              border border-gray-200 dark:border-gray-700 hover:bg-blue-50 
              dark:hover:bg-blue-900/30 transition-colors"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
              </a>
            ))}
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

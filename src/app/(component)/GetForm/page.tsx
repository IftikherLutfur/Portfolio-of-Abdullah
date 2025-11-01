"use client";

import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import {
  FaDownload,
  FaFacebookSquare,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Form = () => {
  return (
    <div className="px-4 my-10 animate-fade-up animate-once">
      <hr />

      <motion.div
        className="mt-10 flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-10 max-w-7xl mx-auto"
        viewport={{ once: true }}
        initial="offscreen"
        whileInView="onscreen"
        variants={{
          offscreen: { opacity: 0, y: 150 },
          onscreen: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", bounce: 0.3, duration: 1 },
          },
        }}
      >
        {/* Contact Card */}
        <div className="flex-1">
          <div className="relative border-2 border-amber-200 rounded-2xl overflow-hidden shadow-lg w-full h-full">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-400 py-8 text-center text-white font-bold text-2xl mb-4 sm:text-3xl">
              Contact Information
            </div>

            {/* Main Card */}
            <div className="bg-white dark:bg-[#1f1f1f] py-10 px-6 sm:px-8 rounded-t-xl border-t-2 -mt-8 relative mx-6 z-10">
              <p className="text-gray-600 dark:text-gray-200 text-2xl font-semibold mb-6 leading-relaxed">
                {"Let's"} discuss something cool together
              </p>

              {/* Email */}
              <p className="flex items-center text-base sm:text-xl font-semibold gap-2 mb-4 text-gray-800 dark:text-white">
                <MdEmail className="bg-purple-700 text-white text-3xl rounded-lg p-1" />
                iftikherlutfur@gmail.com
              </p>

              {/* Phone */}
              <p className="flex items-center text-base sm:text-xl font-semibold gap-2 mb-4 text-gray-800 dark:text-white">
                <IoCall className="bg-purple-700 text-white text-3xl rounded-lg p-1" />
                +8801966095405
              </p>

              {/* Location */}
              <p className="flex items-center text-base sm:text-xl font-semibold gap-2 mb-4 text-gray-800 dark:text-white">
                <span className="bg-purple-700 text-white rounded-lg p-1">
                  📍
                </span>
               <small>Parmanent Address</small> : Habiganj, Bangladesh
              </p>
              {/* Location */}
              <p className="flex items-center text-base sm:text-xl font-semibold gap-2 mb-4 text-gray-800 dark:text-white">
                <span className="bg-purple-700 text-white rounded-lg p-1">
                  📍
                </span>
               <small>Current Address</small> : Gazipur, Bangladesh
              </p>

              {/* Social Links */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  Connect with me
                </h2>
                <ul className="flex flex-wrap gap-6">
                  <li>
                    <a
                      href="https://github.com/IftikherLutfur"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub className="bg-purple-700 p-1 text-4xl text-white rounded-md" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/iftikher-lutfur-094a41256/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaLinkedin className="bg-purple-700 p-1 text-4xl text-white rounded-md" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/Iftikherlutfur"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebookSquare className="bg-purple-700 p-1 text-4xl text-white rounded-md" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://drive.google.com/uc?export=download&id=1KL7AVGch3Vv-Zj8mVkGBjpIEikZf9hTV"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-900 transition">
                        Download CV <FaDownload />
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 border-2 border-amber-200 rounded-2xl shadow-lg bg-white dark:bg-[#1f1f1f] py-10 px-6 sm:px-8">
          <form className="text-black dark:text-white w-full">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <label className="text-sm font-medium">Name</label>
              <div className="relative mt-1">
                <MdDriveFileRenameOutline className="absolute left-2 top-2 text-xl text-gray-600" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full h-10 pl-9 bg-[#fdfaf5] border border-amber-400 rounded-sm focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-5"
            >
              <label className="text-sm font-medium">Email</label>
              <div className="relative mt-1">
                <MdEmail className="absolute left-2 top-2 text-xl text-gray-600" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email"
                  className="w-full h-10 pl-9 bg-[#fdfaf5] border border-amber-400 rounded-sm focus:ring-2 focus:ring-purple-400 outline-none"
                />
              </div>
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-5"
            >
              <label className="text-sm font-medium">Message</label>
              <textarea
                placeholder="Write your message"
                required
                name="message"
                className="w-full h-32 bg-[#fdfaf5] text-black border border-amber-400 rounded-md p-3 mt-1 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              type="submit"
              className="bg-[#000001] dark:bg-white dark:text-black text-white text-lg font-medium rounded-lg px-5 py-2.5 text-center w-full mt-5 hover:scale-105 transition-transform"
            >
              Submit
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Form;

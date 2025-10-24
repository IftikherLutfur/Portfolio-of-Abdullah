"use client"
import { motion, useSpring } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const AboutMe = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = (event:any) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const smoothX = useSpring(mousePosition.x, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mousePosition.y, { stiffness: 100, damping: 20 });

  return (
    <div
      className="relative flex flex-col md:flex-row items-center gap-8 mx-5 mb-20 md:mx-10 mt-10"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Following Glow Effect */}
      <motion.div
        className="absolute w-40 h-40 bg-purple-500 bg-opacity-40 rounded-full blur-3xl pointer-events-none"
        style={{ x: smoothX, y: smoothY }}
      />

      {/* Image Section */}
      <div className="relative w-full md:w-1/3 flex justify-center">
        <div
          className=" h-[300px] sm:h-[350px] md:h-[400px] w-[280px] rounded-xl shadow-lg border border-gray-700 "
          
        >
          <Image
            src={"https://res.cloudinary.com/dgisrhgoe/image/upload/v1757591525/535779979_2241541259641273_2460970773337803536_n_1_qdnwjm.jpg"}
            alt="Profile"
            width={200}
            height={200}
            className=" w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="flex-1 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md p-6 rounded-xl shadow-lg text-start mt-5 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
          About Me
        </h1>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          I am a passionate <strong> Web Developer</strong> with over a year of hands-on coding experience and a strong foundation in the <strong>MERN stack</strong>. Having successfully completed a <strong>comprehensive Web Development Course</strong>, I specialize in <strong>building dynamic, responsive, and user-friendly web applications</strong>.
        </p>

        {/* Skills Section */}
        <div className="mt-5">
          <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li><span className="font-bold">🔹 Frontend Focus:</span> React.js, Next.js, Tailwind CSS, Redux Toolkit, <strong>JavaScript</strong>, <strong>TypeScript</strong></li>
            <li><span className="font-bold">🔹 Full-Stack Skills:</span> MongoDB, Mongoose, PostgreSQL, Express.js, Node.js, Firebase</li>
            <li><span className="font-bold">🔹 Development Interests:</span> Building efficient and scalable web applications</li>
          </ul>
        </div>

        {/* Goals Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">🎯 Goals:</h2>
          <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
            <li>✅ Collaborate with other developers</li>
            <li>✅ Contribute to Open Source projects</li>
            <li>✅ Keep up with the latest web technologies</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">📩 Let’s Connect:</h2>
          <p className="text-gray-800 dark:text-gray-200">iftikherlutfur@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
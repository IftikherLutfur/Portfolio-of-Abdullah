"use client";
import React from "react"
import { FaDownload, FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
const coderData = {
    name: 'Iftikher Lutfur Abdullah',
    role: 'Full Stack Developer',
    seniority: 'Junior-Level',
    location: 'Gazipur, Dhaka, Bangladesh',
    skills: [
        'React',
        'Next.js',
        'Redux Toolkit',
        'JavaScript',
        'TypeScript',
        'TailwindCSS',
        'CSS',
        'Figma',
        'GitHub',
        'HTML',
        'Node.js',
        'Express',
        'MongoDB',
        'Mongoose',
        'PostgreSQL',
        'Vercel',
        'Firebase',
        'Git'

    ],
};

// The styled code window component
const CoderProfileCard = () => {
    return (
        // Main container with gradient, border, and shadow - theme-aware
        <div className="w-full mx-auto bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-[#000000] dark:to-[#0a0d37] border-zinc-300 dark:border-[#1b2c68a0] relative rounded-lg border shadow-lg">

            {/* Top gradient border element */}
            <div className="flex flex-row">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
                <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
            </div>

            {/* Window Header */}
            <div className="px-4 lg:px-8 py-5 flex justify-between items-center bg-zinc-200 dark:bg-[#000000]">
                <div className="flex flex-row space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-zinc-600 dark:text-gray-400 font-mono">coder.js</div>
            </div>

            {/* Code Content Area */}
            <div className="overflow-hidden border-t-[2px] border-zinc-300 dark:border-indigo-900 px-4 lg:px-8 py-4 lg:py-8 relative">
                {/* Background blur effects */}
                <div className="absolute -top-24 -left-24 w-56 h-56 bg-blue-600 rounded-full opacity-10 filter blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-pink-600 rounded-full opacity-10 filter blur-3xl"></div>

                <div className="relative flex">
                    {/* Line Numbers */}
                    <div className="hidden md:flex flex-col items-end pr-4 text-zinc-600 dark:text-gray-500 font-mono text-xs">
                        {Array.from({ length: 12 }, (_, i) => (
                            <div key={i} className="leading-relaxed select-none opacity-70">{i + 1}</div>
                        ))}
                    </div>

                    {/* Code Snippet with theme-aware colors */}
                    <code className="font-mono text-xs md:text-sm lg:text-base w-full">
                        <div>
                            <span className="mr-2 text-pink-500 dark:text-pink-400">const</span>
                            <span className="mr-2 text-violet-500 dark:text-violet-400">coder</span>
                            <span className="mr-2 text-pink-500 dark:text-pink-400">=</span>
                            <span className="text-zinc-600 dark:text-gray-400">{'{'}</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">name:</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                            <span className="text-green-600 dark:text-green-400">{coderData.name}</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;,</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">role:</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                            <span className="text-green-600 dark:text-green-400">{coderData.role}</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;,</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">seniority:</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                            <span className="text-green-600 dark:text-green-400">{coderData.seniority}</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;,</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">location:</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                            <span className="text-green-600 dark:text-green-400">{coderData.location}</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;,</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">skills:</span>
                            <span className="text-zinc-600 dark:text-gray-400">{'['}</span>
                            <div className="pl-6 flex flex-wrap">
                                {coderData.skills.map((skill, index) => (
                                    <span key={skill} className="mr-1">
                                        <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                                        <span className="text-cyan-600 dark:text-cyan-400">{skill}</span>
                                        <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                                        {index < coderData.skills.length - 1 && <span className="text-zinc-600 dark:text-gray-400">, </span>}
                                    </span>
                                ))}
                            </div>
                            <span className="text-zinc-600 dark:text-gray-400">{'],'}</span>
                        </div>
                        <div>
                            <span className="text-zinc-600 dark:text-gray-400">{'};'}</span>
                        </div>
                    </code>
                </div>
            </div>

            {/* Window Footer */}
           
        </div>
    );
};

// Main component
const Banner = () => {
    return (
        <div className="min-h-screen w-full relative flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
            {/* Light mode Azure Depths */}
            <div
                className="absolute inset-0 z-0 dark:hidden"
                style={{
                    background: "radial-gradient(125% 125% at 50% 100%, #ffffff 40%, #3b82f6 100%)",
                }}
            />

            {/* Dark mode Azure Depths */}
            <div
                className="absolute inset-0 z-0 hidden dark:block"
                style={{
                    background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                }}
            />

            {/* Main Content Container */}
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col gap-4 sm:gap-6 items-start text-left order-2 lg:order-1 animate-fade-in-up">
                        

                        <div className="relative">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                                Hello <br />
                                I&apos;m{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    IFTIKHER LUTFUR ABDULLAH
                                </span>
                            </h1>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3 my-2 sm:my-4">
                            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Full Stack</span>
                            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Typescript</span>
                            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">React.js</span>
                            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Next.js</span>
                            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Node.js</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed">
                            Typescript lover | Clean Coder | Crafting frameworks
                        </p>
 <div className="flex flex-col items-center sm:flex-row gap-3 w-full mt-3 sm:w-auto">
              <button className="">
                <ul className="flex items-center justify-center lg:justify-start gap-6">
                            <li className="text-2xl hover:scale-110 transition-transform duration-300">
                              <a href="https://github.com/IftikherLutfur" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                              </a>
                            </li>
                            <li className="text-2xl hover:scale-110 transition-transform duration-300">
                              <a href="https://www.linkedin.com/in/iftikher-lutfur-094a41256/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                              </a>
                            </li>
                            <li className="text-2xl hover:scale-110 transition-transform duration-300">
                              <a href="https://www.facebook.com/Iftikherlutfur" target="_blank" rel="noopener noreferrer">
                                <FaFacebookSquare />
                              </a>
                            </li>
                            </ul>
              </button>
              <button className="bg-purple-600 text-white px-2 py-1 rounded-sm">
                <a
                  href="https://drive.google.com/uc?export=download&id=1zTBOBJMIk0jcYL9azYZ6pyDJizxOp-0U"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2 flex items-center gap-2"
                >
                Download CV <FaDownload />
                </a>
              </button>
            </div>
                    </div>

                    {/* Right Column: Code Editor */}
                    <div className="order-1 lg:order-2 animate-fade-in-up">
                        <CoderProfileCard />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;

// Add custom CSS for animations
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .hover\\:shadow-3xl:hover {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from "react";
import Image from "next/image";
import { IProject } from "@/types/types";

// Assuming IProject type looks something like this based on the original code:
// interface IProject {
//   _id: string;
//   title: string;
//   technology: string[];
//   description: string;
//   image: string[]; // Array of URLs to project images
//   category: string; // New: for "Visual Identity"
//   date: string; // New: for "2024"
//   // Add more fields as needed for other images or details
// }

const clsx = (...args: (string | boolean | undefined | null)[]): string =>
  args.filter(Boolean).join(" ");

export default function ProjectCard(project: IProject) { // Destructure project directly
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8"> {/* Added max-width and vertical padding */}
      <div
        ref={containerRef}
        className="relative rounded-3xl p-[1px] transition-all duration-300 overflow-hidden" // Added overflow-hidden for rounded corners
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, #FF5C5C, #FE8BBB, #F76B1C, #F76B1C, transparent 80%)` // Adjusted gradient colors to match the orange theme
            : "rgba(255, 255, 255, 0.05)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="rounded-3xl p-8 bg-[#fdfaf5] dark:bg-gray-800 flex flex-col lg:flex-row gap-8"> {/* Changed background color to match the beige, adjusted padding, and made it responsive */}

          {/* Left Section (Text and Project Details) */}
          <div className="lg:w-2/5 flex flex-col">

            <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
              {project.title}
              <span className="flex gap-5 text-xl mt-2">
                <a href="">Live Preview</a>
                <a href="">Github</a>
              </span>
            </h1>

            <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="mt-auto pt-4"> {/* Aligned date and studio to the bottom */}

             <span className="flex gap-2">
              {project?.technology?.map((tech: string, index: number) => (
                <p className="bg-black text-white text-xs rounded-xl p-2 " key={index}>{tech}</p>
              ))}
             </span>
            </div>
            {/* Removed Technology Stack and Read More button from this layout as they are not in the reference image for this section */}
          </div>

          {/* Right Section (Image Grid) */}
          <div className="lg:w-3/5 grid grid-cols-2 gap-4">
  {Array.isArray(project.image)
    ? project.image.map((img: string, index: number) => (
        <div
          key={index}
          className="col-span-1 row-span-1 rounded-xl overflow-hidden shadow-md"
        >
          <Image
            src={img}
            alt={`${project.title || "Project"} Image ${index + 1}`}
            width={500}
            height={400}
            layout="responsive"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
      ))
    : (
        <p className="text-gray-500">No images available</p>
      )}
</div>

        </div>
      </div>
    </div>
  );
}
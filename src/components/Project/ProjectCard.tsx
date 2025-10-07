'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "@/types/types";

// Utility function (same as MagicContainer)
const clsx = (...args: (string | boolean | undefined | null)[]): string =>
  args.filter(Boolean).join(" ");

export default function ProjectCard(project: IProject) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <div
        ref={containerRef}
        className="relative rounded-3xl p-[1px] transition-all duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, #9E7AFF, #38bdf8, #FF5C5C, #FE8BBB, transparent 80%)`
            : "rgba(255, 255, 255, 0.05)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="border-2 border-gray-300 rounded-lg p-3 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 flex flex-col h-full">

          {/* Project Title */}
          <h1 className="text-2xl font-semibold text-center my-2 text-black dark:text-white">
            {project.title}
          </h1>

          {/* Project Image */}
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={250}
              className="rounded-md object-cover mb-4 mx-auto"
            />
          )}

          {/* Technology Stack */}
          <div className="flex flex-wrap justify-center gap-2 my-3">
            {project.technology.map((tech: string, index: number) => (
              <span
                key={index}
                className="bg-black text-white px-3 py-1 rounded-full text-sm hover:bg-amber-500 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center">
            {project.description}
          </p>

          {/* Read More button */}
          <div className="mt-auto flex justify-end">
            <Link
              href={`/Project/${project._id}`}
              className="text-amber-500 font-bold hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

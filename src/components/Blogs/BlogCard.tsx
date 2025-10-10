/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { IBlog } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


// A simple utility to conditionally join class names, similar to the 'clsx' library.
const clsx = (...args: (string | boolean | undefined | null)[]): string =>
    args.filter(Boolean).join(' ');

// The BlogCard component creates a container with a glowing border effect that follows the mouse.
// interface BlogCardProps {
//   children: React.ReactNode;
//   className?: string;
// }



const BlogCard = (blog: IBlog) => {
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

        <div className="">
            <div
                ref={containerRef}
                className="relative rounded-3xl p-[1px] transition-all duration-300"
                style={{
                    background: isHovered
                        ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, #9E7AFF, #38bdf8, #FF5C5C, #FE8BBB, transparent 80%)`
                        : 'rgba(255, 255, 255, 0.05)',
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="border-2 border-gray-300 rounded-lg p-2 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 flex flex-col h-full">

                    {/* Blog Image */}
                    {blog?.image && (
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            width={500}
                            height={300}
                            unoptimized
                            className="rounded-md object-cover mb-4 mx-auto w-full"
                        />
                    )}


                    <h1 className="text-2xl font-semibold mb-2 text-center text-black dark:text-white">
                        {blog.title}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                        Author: <span className="font-medium text-black dark:text-white">{blog.author}</span>
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {blog.tags.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="bg-black text-white px-3 py-1 rounded-full text-sm hover:bg-amber-500 transition-colors duration-200"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Read More button pinned to bottom-right */}
                    <div className="mt-auto flex justify-end">
                        <Link
                            href={`/Blogs/${blog._id}`}
                            className="text-amber-500 font-bold hover:underline"
                        >
                            Read More →
                        </Link>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default BlogCard;
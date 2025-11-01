"use client";
import type React from "react";

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
}

interface TimelineProps {
  data?: TimelineItem[];
  className?: string;
}

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl bg-white p-6 md:p-8 text-sm leading-7 text-gray-700 shadow-lg dark:bg-gray-950 dark:text-gray-300 ${className}`}
  >
    {children}
  </div>
);

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 ${className}`}
  >
    {children}
  </span>
);

const defaultTimelineData: TimelineItem[] = [
  {
    id: "1",
    title: "Diploma in Engineering at CST",
    company: "Habiganj Polytechnic Institute",
    date: "2022–2025",
    description: "Department: Computer Science & Technology",
  },
  {
    id: "2",
    title: "Complete Web Development Course With Jhankar Mahbub",
    company: "Programming Hero",
    date: "2024 January–July",
    description:
      "A MERN Stack Development Course covering JavaScript, MongoDB, Express.js, React.js, Node.js, Tailwind CSS.",
  },
  {
    id: "3",
    title: "Looking for my first professional experience",
    company: "",
    date: "",
    description: "",
  },
];

export default function TimelinePage3({
  data = defaultTimelineData,
  className = "",
}: TimelineProps) {
  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl text-center font-bold text-black dark:text-white mb-10">
        Experience
      </h1>

      <div className={`relative flex justify-center ${className}`}>
        {/* Center Line */}
        <div className="absolute hidden md:block left-1/2 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2"></div>

        <div className="relative w-full max-w-5xl flex flex-col gap-12">
          {data.map((item, index) => {
            const isRight = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center md:items-stretch ${
                  isRight ? "md:justify-end" : "md:justify-start"
                }`}
              >
                {/* Connector Dot */}
                <div className="hidden md:block absolute left-1/2 h-6 w-6 rounded-full bg-sky-500 border-4 border-white dark:border-gray-900 transform -translate-x-1/2 z-10"></div>

                {/* Timeline Card */}
                <div
                  className={`w-full md:w-[45%] ${
                    isRight ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  }`}
                >
                  <Card className="border-2 border-amber-400">
                    <h3
                      className={`${
                        item.title ===
                        "Looking for my first professional experience"
                          ? "text-xl font-bold"
                          : "text-xl font-semibold"
                      } text-gray-900 dark:text-white`}
                    >
                      {item.title}
                    </h3>
                    <div
                      className={`flex flex-wrap items-center gap-2 mt-1 ${
                        isRight ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <p className="text-sky-600 dark:text-sky-400 font-medium">
                        {item.company}
                      </p>
                      {item.date && <Badge>{item.date}</Badge>}
                    </div>
                    {item.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {item.description}
                      </p>
                    )}
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client"
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
export default function MySkills() {
  const skills = [
    { category: "Backend", name: "MongoDB", img: "https://i.ibb.co/wZYK6Qgk/mongo-DB-pwhp-n-Tj.png" },
    { category: "Backend", name: "Mongoose", img: "https://avatars.githubusercontent.com/u/7552965?s=280&v=4" },
    { category: "Backend", name: "PostgreSQL", img: "https://download.logo.wine/logo/PostgreSQL/PostgreSQL-Logo.wine.png" },
    { category: "Backend", name: "Express.js", img: "https://i.ibb.co/fVG5nkSJ/Express-Dbhf-Mk-ND.png" },
    { category: "Frontend", name: "React.js", img: "https://i.ibb.co/Rp3nfpV6/react-Dm-Qed7ww.png" },
    { category: "Frontend", name: "Redux", img: "https://repository-images.githubusercontent.com/347723622/92065800-865a-11eb-9626-dff3cb7fef55" },
    { category: "Backend", name: "Node.js", img: "https://i.ibb.co/27VMYCB0/nodejs-BXc-G4-YML.png" },
    { category: "Frontend", name: "Next.js", img: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
    { category: "Language", name: "JavaScript", img: "https://i.ibb.co/bR3MmB2H/java-script-DPNp-Sp-G3.png" },
    { category: "Language", name: "TypeScript", img: "https://i.ibb.co/spjjqkDj/typescript.png" },
    { category: "Frontend", name: "Tailwind CSS", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png" },
    { category: "Frontend", name: "CSS", img: "https://i.ibb.co/Z6LzWBwt/css-3-b-Lr-ZJUBe.png" },
    { category: "Frontend", name: "HTML", img: "https://i.ibb.co/LzBCYDGB/html-CG-j-Y1v-C.png" },
    { category: "Frontend", name: "Redux Toolkit", img: "https://cdn.worldvectorlogo.com/logos/redux.svg" },
    { category: "Frontend", name: "Figma", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1365px-Figma-logo.svg.png" },
    { category: "Tools", name: "GitHub", img: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" },
    { category: "Backend", name: "Vercel", img: "https://www.svgrepo.com/show/354513/vercel-icon.svg" },
    { category: "Backend", name: "Firebase", img: "" },
    { category: "Tools", name: "Git", img: "https://git-scm.com/images/logos/logomark-orange@2x.png" },
  ];

  return (
    <div><h1 className="text-5xl my-5 font-bold text-center text-black dark:text-white">My Skills</h1>
      <div className=" flex justify-center">
        <Tabs>
          <TabList className="flex justify-center gap-6 rounded-2xl bg-amber-50 dark:bg-neutral-900 px-6 py-3 text-lg font-semibold text-gray-800 dark:text-gray-100 shadow-sm">
            <Tab className="transition-all duration-300 hover:text-amber-600 hover:scale-105 focus:text-amber-600 hover:cursor-pointer focus:outline-none p-2">
              Frontend
            </Tab>
            <Tab className="transition-all duration-300 hover:text-amber-600 hover:scale-105 focus:text-amber-600 hover:cursor-pointer focus:outline-none p-2">
              Backend
            </Tab>
            <Tab className="transition-all duration-300 hover:text-amber-600 hover:scale-105 focus:text-amber-600 hover:cursor-pointer focus:outline-none p-2">
              Language
            </Tab>
            <Tab className="transition-all duration-300 hover:text-amber-600 hover:scale-105 focus:text-amber-600 hover:cursor-pointer focus:outline-none p-2">
              Tools
            </Tab>
          </TabList>

          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
              {skills
                .filter((skill) => skill.category === "Frontend")
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center border-2 border-amber-500 rounded-xl p-4 hover:scale-105 transform transition-all duration-300 shadow-md bg-white dark:bg-gray-800"
                  >

                    {skill.img && (
                      <Image
                        src={skill.img}
                        alt={skill.name}
                        width={64}
                        height={64}
                        className="object-contain mb-2"
                      />
                    )}
                    <h1 className="text-black dark:text-white text-center font-medium">
                      {skill.name}
                    </h1>
                  </div>
                ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
              {skills
                .filter((skill) => skill.category === "Backend")
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center border-2 border-amber-500 rounded-xl p-4 hover:scale-105 transform transition-all duration-300 shadow-md bg-white dark:bg-gray-800"
                  >

                    {skill.img && (
                      <Image
                        src={skill.img}
                        alt={skill.name}
                        width={64}
                        height={64}
                        className="object-contain mb-2"
                      />
                    )}
                    <h1 className="text-black dark:text-white text-center font-medium">
                      {skill.name}
                    </h1>
                  </div>
                ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
              {skills
                .filter((skill) => skill.category === "Language")
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center border-2 border-amber-500 rounded-xl p-4 hover:scale-105 transform transition-all duration-300 shadow-md bg-white dark:bg-gray-800"
                  >

                    {skill.img && (
                      <Image
                        src={skill.img}
                        alt={skill.name}
                        width={64}
                        height={64}
                        className="object-contain mb-2"
                      />
                    )}
                    <h1 className="text-black dark:text-white text-center font-medium">
                      {skill.name}
                    </h1>
                  </div>
                ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
              {skills
                .filter((skill) => skill.category === "Tools")
                .map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center border-2 border-amber-500 rounded-xl p-4 hover:scale-105 transform transition-all duration-300 shadow-md bg-white dark:bg-gray-800"
                  >

                    {skill.img && (
                      <Image
                        src={skill.img}
                        alt={skill.name}
                        width={64}
                        height={64}
                        className="object-contain mb-2"
                      />
                    )}
                    <h1 className="text-black dark:text-white text-center font-medium">
                      {skill.name}
                    </h1>
                  </div>
                ))}
            </div>
          </TabPanel>

        </Tabs>
      </div>
    </div>

  );
}

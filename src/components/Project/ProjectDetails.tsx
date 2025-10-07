import Image from "next/image";
import { IProject } from "@/types/types";

export default function ProjectDetails(project:IProject) {
  return (
    <div className="flex justify-center items-center my-5">
      <div className="border-2 border-amber-500 bg-white dark:bg-black p-3 text-center rounded-md bg-">
        <h1 className="text-3xl my-4 font-bold text-black dark:text-white mt-4">
            {project?.title}
          </h1>
        <div className="flex justify-center">
            
          {
            project.image && (<Image
            src={project.image}
            alt={project.title}
            width={500}
            height={200}
            className="rounded-md"
          />)
          }
        </div>
        <div>
         
          
          <div className="flex justify-center flex-wrap my-5 gap-2">
            {project?.technology?.map((tech:string, index:number) => (
              <span
                key={index}
                className="bg-black dark:bg-black text-white px-3 py-1 rounded-full text-sm hover:bg-amber-500 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-black dark:text-white font-semibold opacity-80 mt-2">
            {project?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

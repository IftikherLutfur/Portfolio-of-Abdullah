import ProjectCard from "@/components/Project/ProjectCard"
import { IProject } from "@/types/types"


export default async function Project() {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`)
    const {data:projects} = await res.json()
    console.log(projects)
    return (
        <div>
            <h1 className="text-5xl my-4 font-bold text-center text-black dark:text-white1">Projects</h1>
            {projects.map((project:IProject)=>
            <ProjectCard key={project._id} {...project} />
            )}
        </div>
    )
}

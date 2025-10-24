import ProjectCard from "@/components/Project/ProjectCard"
import { IProject } from "@/types/types"


export default async function Project() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project`)
    const { data: projects } = await res.json()
    console.log(projects)
    return (
        <div className="my-10">
            <h1 className="text-5xl my-10 font-bold text-center text-black dark:text-white">Projects</h1>
            <div className="">
                {projects.map((project: IProject) => (
                    <ProjectCard key={project._id} {...project} />
                ))}
            </div>

        </div>
    )
}

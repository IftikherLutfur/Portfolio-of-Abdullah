import ProjectDetails from "@/components/Project/ProjectDetails";

export default async function ProjectDetail({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/project/${projectId}`)
    const getSingleBlog = await res.json()
    const project = await getSingleBlog.data
    console.log(project)

    return (
        <div className="min-h-dvh py-20 ">

            <h1 className="text-black text-center text-7xl font-bold">ProjectDetails</h1>
            <ProjectDetails {...project}/>

        </div>
    )
}

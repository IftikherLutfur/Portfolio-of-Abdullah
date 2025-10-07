import { IBlog } from "@/types/types";
import Image from "next/image"
import { FaPen } from "react-icons/fa";

export default function BlogDetail(blog:IBlog) {
  return (
   <div className="flex justify-center items-center min-h-screen">
  <div className="border-2 border-amber-500 bg-white dark:bg-black p-3 text-center rounded-md bg-">
    <div className="flex justify-center">
      {
        blog.image && (<Image
        src={blog.image}
        alt={blog.title}
        width={500}
        height={200}
        className="rounded-md"
      />)
      }
    </div>
    <div>
      <span className="flex justify-center items-center my-2 text-black dark:bg-white">
    <FaPen/> {blog.author}
      </span>
      <h1 className="text-4xl font-bold text-black dark:text-white mt-4">
        {blog?.title}
      </h1>
      <p className="text-black dark:text-white font-semibold opacity-80 mt-2">
        {blog?.description}
      </p>
      <div className="flex justify-center flex-wrap my-5 gap-2">
        {blog?.tags?.map((tag:string, index:number) => (
          <span
            key={index}
            className="bg-black dark:bg-black text-white px-3 py-1 rounded-full text-sm hover:bg-amber-500 transition-colors duration-200"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

import BlogCard from "@/components/Blogs/BlogCard"

export default async function BlogPage () {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`)
    const {data:blogs} = await res.json()
    return (
       <div className="my-10">
        <h1 className="text-5xl my-10 text-center text-black dark:text-white font-semibold">Blogs</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog: any)=>
            <BlogCard key={blog._id} {...blog} />
            )}
        </div>
       </div>
    )
}

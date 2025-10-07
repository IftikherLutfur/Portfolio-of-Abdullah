import BlogDetail from "@/components/Blogs/BlogDetails";


const BlogDetailsPage =async ({params}:{params:Promise<{blogId:string}>}) => {
    const {blogId} = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogId}`)
    const getSingleBlog = await res.json()
    const blog = await getSingleBlog.data
    console.log(blog)
    return (
        <div className="min-h-dvh">
       
            <BlogDetail {...blog} />
    
                    </div>
    );
};

export default BlogDetailsPage;
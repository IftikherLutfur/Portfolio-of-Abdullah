import AboutMe from "./AboutMe/page";
import Banner from "./Banner/page";
import BlogPage from "./Blogs/page";
import MySkills from "./MySkills/page";
import Project from "./Project/page";

export default function HomePage() {
  return (
    <div className="py-20">
        <Banner/>
        <AboutMe/>
        <MySkills/>
        <Project/>
        <BlogPage/>
    </div>
  )
}

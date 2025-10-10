import AboutMe from "./AboutMe/page";
import Achievement from "./Achievement/page";
import Banner from "./Banner/page";
import BlogPage from "./Blogs/page";
import TimelinePage3 from "./Experience/page";
import Form from "./GetForm/page";
import MySkills from "./MySkills/page";
import Project from "./Project/page";

export default function HomePage() {
  return (
    <div className="">
        <Banner/>
        <AboutMe/>
        <MySkills/>
        <TimelinePage3/>
        <Achievement/>
        <Project/>
        <BlogPage/>
        <Form/>
    </div>
  )
}

"use client"
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaDownload, FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";


const Form = () => {


  return (
    <div className="px-4 my-10 animate-fade-up animate-once">
      <hr />
      <motion.div
        className='mt-5 p-4 rounded-md lg:flex px-20 items-center gap-6'
        viewport={{ once: true }}
        variants={{
          offscreen: { opacity: 0, y: 200 },
          onscreen: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", bounce: 0.4, duration: 1 },
          },
        }}
      >
        <div className='pl-2  flex-1'>
          <h1 className='font-bold text-4xl gap-2 mb-4 md:text-left'>{"LET'S DISCUSS COOL SOMETHING TOGHETHER"}</h1>
          <p className="flex items-center text-2xl font-semibold gap-1 text-center md:text-left my-2 "><MdEmail  className="bg-amber-400 text-black text-3xl rounded-md p-1"/> iftikherlutfur@gmail.com</p>
          <p className="flex items-center my-4 text-2xl font-semibold gap-1 text-center md:text-left "><IoCall  className="bg-amber-400 text-black text-3xl rounded-md p-1"/> +8801966095405</p>
          <ul className="flex gap-6 mt-6 md:justify-start">
            <li className="text-2xl"><button><a href="https://github.com/IftikherLutfur"><FaGithub className="bg-amber-400 text-black p-1 rounded-md text-3xl" /></a></button></li>
            <li className="text-2xl"><button><a href="https://www.linkedin.com/in/iftikher-lutfur-094a41256/"><FaLinkedin className="bg-amber-400 text-black p-1 rounded-md text-3xl" /></a></button></li>
            <li className="text-2xl"><button><a href="https://www.facebook.com/Iftikherlutfur"><FaFacebookSquare className="bg-amber-400 text-black p-1 rounded-md text-3xl" /></a></button></li>
            <li><a href="https://drive.google.com/uc?export=download&id=1p2pmhDznwCt5luoIF2YmsX8m2RSwrJ19

">
              <button className="bg-[#000000] text-white  px-2 py-1 rounded-sm flex items-center">
                Download CV<FaDownload />
              </button></a>
            </li>
          </ul>
        </div>

        {/* Form Section */}
        <div className='mt-5 mx-6 flex-1'>
          <form>
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <label htmlFor="" className=''><small>Name</small></label><br />
              <p className='absolute mt-2 pl-2 text-xl'><MdDriveFileRenameOutline /></p>
              <input type="text" name='name' required placeholder='Enter your name' className='w-full h-9 px-9 bg-[#fdfaf5]  border-amber-400 rounded-sm border-[1px]' />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4"
            >
              <label htmlFor="" className=''><small>Email</small></label><br />
              <p className='absolute mt-2 pl-2  text-xl'><MdEmail /></p>
              <input type="email" name='email' required placeholder='Enter email' className='w-full h-9 px-9 bg-[#fdfaf5]  border-amber-400 rounded-sm border-[1px]' />
            </motion.div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4"
            >
              <label htmlFor="" className=''><small>Message</small></label><br />
              <textarea placeholder='Write your message' required name='message'  className='w-full border bg-[#fdfaf5]  border-amber-400 rounded-md p-3' />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              type="submit"
              className=" bg-[#000001] text-white text-xl font-medium rounded-lg px-5 py-2.5 text-center w-full mt-4"
            >
              Submit
            </motion.button>
        
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Form;
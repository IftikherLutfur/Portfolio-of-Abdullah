"use client";
import React from "react";

function Footer() {


  return (
    <footer className="pt-10 px-4 sm:px-6 lg:px-8 border-t-2 border-amber-400 font-inter relative overflow-hidden ">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <div className=" flex items-center  justify-center">
         
          <span className="text-gray-900 dark:text-white text-3xl font-extrabold tracking-wide">
           Iftikher Lutfur Abdullah
          </span>
        </div>

        <p className="text-centers mb-3 text-gray-500 dark:text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

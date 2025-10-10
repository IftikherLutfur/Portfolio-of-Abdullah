import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
    const handleForLogout = () => {
        signOut()
    }
    return (
        <div className="w-1/4 min-h-screen bg-white dark:bg-gray-900 border-r-2 border-amber-300 shadow-lg flex flex-col justify-between">

            {/* Top Section */}
            <div>
                <h1 className="text-3xl font-bold text-black dark:text-white text-center py-6">
                    Dashboard
                </h1>
                <hr className="border-amber-300" />

                <div className="flex flex-col mt-12 space-y-4 px-4">
                    <Link href={"/Dashboard/BlogCreate"}>
                    <Button className="text-xl py-3 w-full hover:bg-amber-300 hover:text-black transition-colors duration-300">
                        Manage Blog
                    </Button>
                    </Link>

                   <Link href={"/Dashboard/ProjectCreate"}>
                    <Button className="text-xl py-3 w-full hover:bg-amber-300 hover:text-black transition-colors duration-300">
                        Manage Project
                    </Button>
                   </Link>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="px-4 pb-6">
                
                <Button className="text-xl py-3 w-full bg-green-500 hover:bg-green-600 transition-colors duration-300">
                  <Link href={'/'}>
                    Home
                    </Link>
                </Button>
                <Button onClick={handleForLogout} className="text-xl py-3 w-full bg-red-500 hover:bg-red-600 transition-colors duration-300">
                    Logout
                </Button>
            </div>
        </div>
    );
}

'use client'
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/Providers/AuthProvider';

// --- Navbar Component ---



const navGlowVariants: Variants = {
    initial: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};



function Navbar(): React.JSX.Element {

    return (
        <motion.nav
            className="p-2 fixed z-20 w-full bg-white/60 dark:bg-black/60 backdrop-blur-lg border border-gray-200/80 dark:border-gray-800/80 shadow-lg dark:shadow-gray-900/20 overflow-hidden"
            initial="initial"
            whileHover="hover"
        >
            <motion.div
                className="absolute -inset-2 rounded-3xl z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(239,68,68,0.1) 100%)"
                }}
                variants={navGlowVariants}
            />
            <ul className="flex items-center gap-2 relative z-10 w-full">
               <li className='text-2xl font-semibold'>
                Dev.Abdullah
               </li>
                {/* Hire Me button একদম ডানে চলে যাবে */}
                <li className="ml-auto flex gap-2">
                    
                    <Button>
                        <Link href={"/Dashboard"}>
                        Dashboard
                        </Link>
                        </Button>
                </li>
            </ul>
        </motion.nav>
    );
}

export default Navbar;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";


const ChevronPatternIcon = () => (
    <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-0"
        aria-hidden="true"
    >
        <defs>
            <pattern
                id="chevron"
                patternUnits="userSpaceOnUse"
                width="20"
                height="20"
                patternTransform="scale(1) rotate(45)"
            >
                <rect
                    x="0"
                    y="0"
                    width="10"
                    height="20"
                    fill="rgba(255, 255, 255, 0.03)"
                    className="dark:fill-white/[0.03] fill-black/[0.03]"
                />
                <rect
                    x="10"
                    y="0"
                    width="10"
                    height="20"
                    fill="rgba(255, 255, 255, 0.05)"
                    className="dark:fill-white/[0.05] fill-black/[0.05]"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chevron)" />
    </svg>
);

export default function LoginCard() {
    const {setUser} = useAuth()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const values = {
            email,
            password,
        };
        try {
            const res = await Login(values)
            console.log(res)
            if (res.success) {
                setUser(res.user)
                router.push("/")
            } else {
                console.error("Response Error:", res)
            }

        } catch (error) {
            console.log(error)
        }
        console.log("✅ Sending Login data:", values);
    }

    return (
        <div className="font-sans antialiased text-gray-900 dark:text-white w-full flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#1E1B29] rounded-2xl p-6 sm:p-8 shadow-2xl relative max-w-sm w-full border border-gray-200 dark:border-white/10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8">
                    <div
                        className="w-full h-full bg-gray-100 dark:bg-[#100E16] rounded-b-full border-x border-b border-gray-200 dark:border-white/10"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
                    ></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">




                    <div className="signin-step space-y-4">
                        {/* Email field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">

                                    <svg
                                        className="w-6 h-6 fill-black"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7 2.75C5.38503 2.75 3.92465 3.15363 2.86466 4.1379C1.79462 5.13152 1.25 6.60705 1.25 8.5V15.5C1.25 17.393 1.79462 18.8685 2.86466 19.8621C3.92465 20.8464 5.38503 21.25 7 21.25H17C18.615 21.25 20.0754 20.8464 21.1353 19.8621C22.2054 18.8685 22.75 17.393 22.75 15.5V8.5C22.75 6.60705 22.2054 5.13152 21.1353 4.1379C20.0754 3.15363 18.615 2.75 17 2.75H7ZM19.2285 8.3623C19.5562 8.10904 19.6166 7.63802 19.3633 7.31026C19.1101 6.98249 18.6391 6.9221 18.3113 7.17537L12.7642 11.4616C12.3141 11.8095 11.6858 11.8095 11.2356 11.4616L5.6886 7.17537C5.36083 6.9221 4.88982 6.98249 4.63655 7.31026C4.38328 7.63802 4.44367 8.10904 4.77144 8.3623L10.3185 12.6486C11.3089 13.4138 12.691 13.4138 13.6814 12.6486L19.2285 8.3623Z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="signin-input w-full pl-9 pr-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">

                                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1" >
                                        <g transform="translate(0 -1028.4)">
                                            <g transform="matrix(.70711 .70711 -.70711 .70711 740.06 298.16)">
                                                <path d="m10.541 1028.9c-3.3134 0-5.9997 2.6-5.9997 6 0 3.3 2.6863 6 5.9997 6 3.314 0 6-2.7 6-6 0-3.4-2.686-6-6-6zm0 2c1.105 0 2 0.9 2 2s-0.895 2-2 2c-1.1042 0-1.9997-0.9-1.9997-2s0.8955-2 1.9997-2z" fill="#f39c12" />
                                                <g fill="#f1c40f">
                                                    <path d="m10 0c-3.3137 0-6 2.6863-6 6s2.6863 6 6 6c3.314 0 6-2.6863 6-6s-2.686-6-6-6zm0 2c1.105 0 2 0.8954 2 2s-0.895 2-2 2c-1.1046 0-2-0.8954-2-2s0.8954-2 2-2z" transform="translate(0 1028.4)" />
                                                    <rect height="2" width="6" y="1039.4" x="7" />
                                                    <path d="m8 13v9l2 2 2-2v-1l-2-1 2-1v-1l-1-1 1-1v-3z" transform="translate(0 1028.4)" />
                                                </g>
                                                <path d="m11 1041.4v4l1-1v-3h-1zm0 4v2.5l1-0.5v-1l-1-1zm0 3.5v2.5l1-1v-1l-1-0.5z" fill="#f39c12" />
                                                <path d="m9 1041.4v10l1 1v-4-7h-1z" fill="#f39c12" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    className="signin-input w-full pl-9 pr-10 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>


                    </div>

                    <Button className="w-full my-5">Login</Button>


                </form>

                <p className="text-gray-500 dark:text-[#6C6A7B] text-sm text-center mt-4">
                    {"If you don't have an account please go"} <a href="/Register" className="text-gray-900 dark:text-gray-100 font-medium hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
}

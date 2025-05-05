import { useNavigate } from "react-router";
import logo from "../assets/logo.webp";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LandingPageNavBar = () => {
    const [navbarShow, setNavbarShow] = useState(false);
    const navigate = useNavigate();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setNavbarShow(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return (
        <>
            {/* Toggle Button START*/}
            <div
                ref={navRef}
                onClick={() => setNavbarShow((prev) => !prev)}
                className="inline absolute right-6 top-6 lg:hidden w-10 h-10 rounded-sm p-[2px] bg-gradient-to-t from-black to-medium-gray z-50"
            >
                <div className="w-full h-full rounded-sm bg-deep-black flex justify-center items-center relative">
                    <div
                        className={`absolute w-5 h-0.5 bg-white transition-all duration-300 ${
                            navbarShow ? "rotate-45" : "-translate-y-1.5"
                        }`}
                    ></div>

                    <div
                        className={`absolute w-5 h-0.5 bg-white transition-all duration-300 ${
                            navbarShow ? "opacity-0" : ""
                        }`}
                    ></div>

                    <div
                        className={`absolute w-5 h-0.5 bg-white transition-all duration-300 ${
                            navbarShow ? "-rotate-45" : "translate-y-1.5"
                        }`}
                    ></div>
                </div>
            </div>
            {/* Toggle Button END */}
            <AnimatePresence>
                {navbarShow && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{
                            type: "tween",
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className="h-[100%] absolute top-0 left-0 p-5 bg-black z-50 py-10"
                    >
                        <img src={logo} alt="Echomind logo" />
                        <ul className="flex flex-col mt-10 gap-2">
                            <a href="/home/#home">Home</a>
                            <a href="/home/#features">Features</a>
                            <a href="/home/#about">About</a>
                            <a
                                href="/register"
                                className="
        bg-[#1F1C1C]  py-1 border-2 border-granite-gray
        cursor-pointer"
                            >
                                Register
                            </a>
                            <a
                                href="/login"
                                className="
        bg-gradient-to-r from-vibrant-violet to-rich-purple
        py-1 border-2 border-soft-violet
        cursor-pointer"
                            >
                                Login
                            </a>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hight VIEW */}
            <div className="hidden lg:block  w-[70%] h-[80px] rounded-[20px] p-[2px] bg-gradient-to-t from-black to-medium-gray">
                <div className="w-full h-full rounded-[20px] bg-deep-black flex justify-between px-6 ">
                    <div className="  md:flex items-center ">
                        <img src={logo} width={200} />
                    </div>
                    {/* Liks */}
                    <div className="flex gap-2 lg:gap-8  items-center">
                        <a href="/home/#home">Home</a>
                        <a href="/home/#features">Features</a>
                        <a href="/home/#about">About</a>
                    </div>

                    <div className="flex gap-2 md:gap-5 items-center">
                        <div
                            className="
        bg-[#1F1C1C] px-7 pt-[3px] pb-[5px]  rounded-[18px] border-2 border-granite-gray
        cursor-pointer
        "
                            onClick={() => navigate("/register")}
                        >
                            SignUp
                        </div>
                        <div
                            className="
        bg-gradient-to-r from-vibrant-violet to-rich-purple
        rounded-[18px] px-7 pt-[3px] pb-[5px] border-2 border-soft-violet
        cursor-pointer
        "
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

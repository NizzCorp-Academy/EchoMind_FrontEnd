import { LandingPageList } from "@/types/misc.types";
import { LandingPageNavBar } from "../components/LandingPageNavBar";
import "../index.css";
import { useNavigate } from "react-router";
import data from "../assets/svg/data.svg";
import timeFast from "../assets/svg/time-fast 1.svg";
import user_speak from "../assets/svg/user-speaking 1.svg";
import world from "../assets/svg/world.svg";
import robofeature from "../assets/robo2.webp";
import robo from "../assets/robo.webp";
import { motion } from "framer-motion";
import logo from "../assets/logo.webp";
import bottomLogo from "../assets/nizzcorp.webp";

export const LandingPage = () => {
    const navigate = useNavigate();
    const lists: LandingPageList[] = [
        {
            title: "Multilingual Communication",
            description:
                "Breaks language barriers and connects with users worldwide.",
            icon: world,
        },
        {
            title: "Data Insights & Analytics",
            description:
                "Tracks user interactions to improve service and decision-making.",
            icon: data,
        },
        {
            title: "Smart Conversations",
            description:
                "Understands queries and responds naturally using AI-powered language processing.",
            icon: user_speak,
        },
        {
            title: "Instant Responses",
            description: "No more waiting — users get immediate answers, 24/7.",
            icon: timeFast,
        },
    ];
    return (
        <div className="font-[Montserrat] text-white bg-deep-black">
            {/* Header Section */}
            <div className="relative overflow-hidden ">
                <div className="absolute bg-[#460F9E4D] blur-[100px] w-[600px] h-[400px] rounded-full bottom-0 right-[150px]"></div>
                <div className="absolute bg-[#460F9E4D] blur-[100px] w-[2500px] h-[900px] rounded-full -bottom-[750px] -left-[200px] "></div>
                <div className="w-full flex items-center justify-center pt-6 pb-2">
                    <LandingPageNavBar />
                </div>
                <div
                    id="home"
                    data-testid="home"
                    className="flex flex-col md:flex-row items-center justify-between pt-16 px-6 lg:px-[100px]"
                >
                    <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0 }}
                        className=" flex flex-col justify-between gap-10 lg:gap-16"
                    >
                        <div className="overflow-y-clip max-w-[500px] space-y-[15px]">
                            <div className="section-title">
                                Get ready for the new era of AI
                            </div>
                            <div className="text-sm">
                                Experience the future of AI-driven support —
                                intelligent, responsive, and built to scale with
                                your needs. Whether you're growing a startup or
                                optimizing enterprise operations, our technology
                                adapts to your journey.
                            </div>
                        </div>
                        <div className="space-y-[18px]">
                            <div className="bg-gradient-to-r from-soft-violet to-[#2A0070] h-[50px] flex items-center w-[150px] justify-center rounded-[16px] p-[1.5px]">
                                <div
                                    data-testid="get-start"
                                    className="bg-gradient-to-r from-vibrant-violet to-rich-purple h-full flex items-center w-full justify-center rounded-[16px] cursor-pointer"
                                    onClick={() => navigate("/register")}
                                >
                                    Get Started
                                </div>
                            </div>
                            <div className="text-[#999999] text-sm">
                                Empowering your support system with cutting-edge
                                AI and seamless user experience.
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="z-10"
                    >
                        <img src={robo} width={600} loading="lazy" />
                    </motion.div>
                </div>
            </div>
            {/* HEADER END */}
            {/* FEATURE START */}
            <section
                id="features"
                data-testid="features"
                className="w-full h-full flex flex-col items-start px-12 py-9 bg-radial-top-left  bg-deep-black gap-2 "
            >
                <h3 className="font-semibold">Features</h3>
                <h2 className="section-title">Say Hello to Smarter Support</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                    <div className="flex flex-col gap-4 my-5 md:my-0">
                        {lists.map((list, index) => (
                            <motion.div
                                initial={{ x: -200, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                key={index}
                                className="flex flex-row items-start gap-4 p-4 rounded-xl shadow-md"
                            >
                                <img
                                    src={list.icon}
                                    alt={list.title}
                                    className="w-10 h-10"
                                />
                                <div>
                                    <h3 className="text-lg text-white font-semibold">
                                        {list.title}
                                    </h3>
                                    <p className="text-sm font-medium">
                                        {list.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <img
                        src={robofeature}
                        alt="A robote " loading="lazy"
                        className="max-h-[800px]  object-contain"
                    />
                </div>
            </section>
            {/* FEATURE eND */}
            {/* Footer Section */}
            <div className="w-full h-full flex flex-col items-start px-12 py-9 bg-radial-top-left  bg-deep-black gap-2 ">
                <div className="font-semibold" id="about" data-testid="about">
                    ABOUT US
                </div>
                <h1 className="section-title">
                    Powered by Nizzcorp, Built for You
                </h1>
                <div className="font-medium w-full  md:w-[75%]">
                    At NizzCorp, we believe in building technology that feels
                    like magic — fast, smart, and human. Founded with a passion
                    for innovation and a deep curiosity for the future, NizzCorp
                    is a modern tech company focused on building intelligent
                    systems that empower users to do more. form Ai- Driven
                    application so scalable web platforms, we specialize in
                    create tools that are not only powerful but also intuitive
                    Our latest project harnesses the capabilities of cutting
                    large language
                </div>
            </div>
            <div
                data-testid="footer"
                className="w-full h-full flex flex-col items-start pt-4 px-12 pb-8 bg-radial-top-left  bg-deep-black"
            >
                <img src={logo} className="w-44" />
                {/* bottom */}
                <div className="flex flex-col-reverse lg:flex-row w-full lg:gap-20">
                    {/* Links */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start md:items-center py-8 px-2">
                        <div className="space-y-3.5">
                            <div className="font-semibold">Company</div>
                            <ul className="text-sm space-y-1.5">
                                <li>About</li>
                                <li>Services</li>
                                <li>Features</li>
                                <li>Pricing</li>
                            </ul>
                        </div>
                        <div className="space-y-3.5">
                            <div className="font-semibold">Resources </div>
                            <ul className="text-sm space-y-1.5">
                                <li>Case Studies</li>
                                <li>Webinars</li>
                                <li>Developer</li>
                                <li>Documentation</li>
                            </ul>
                        </div>
                        <div className="space-y-0 md:space-y-3.5">
                            <div className="font-semibold">Help </div>
                            <ul className="text-sm space-y-1.5">
                                <li>Customer Support</li>
                                <li>Delivery Details</li>
                                <li>Terms & Conditions</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="h-full space-y-5 flex flex-col py-8 ">
                        <div className="font-semibold">
                            Subscribe To Newsletter
                        </div>
                        <div className=" flex flex-col sm:flex-row gap-3 items-start justify-center  text-sm ">
                            <input
                                className="bg-gradient-to-r from-harcoal-gray to-granite-gray  outline-none border-2 border-[#1F1C1C] p-3  rounded-full w-full lg:min-w-3xs"
                                placeholder="Enter Email Address"
                            />
                            <button className="bg-[#571ABC] font-semibold rounded-full py-4 px-6 w-full sm:w-1/4 lg:w-full">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-3 md:px-20 py-10">
                    <img src={bottomLogo} className="" />
                </div>
            </div>
        </div>
    );
};
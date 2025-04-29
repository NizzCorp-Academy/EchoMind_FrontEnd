import { useState } from "react";
import { ChatScreen } from "../components/ChatScreen";
import Sidebar from "../components/Sidebar";
import { useTheme } from "next-themes";

export const ChatScreenPage = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark" ? false : true;
    const [isOpen, setIsOpen] = useState(true);
    const toggleSideBar = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <div
            className={` ${
                isDark
                    ? "bg-[#29193C] text-white "
                    : " bg-gradient-to-r from-[#460F9E4D] to-[#1905380]"
            } w-screen flex`}
        >
            {/* <div
        className={`${!isOpen ? "w-[20%]" : "w-[0%]"}
         bg-yellow-500
          transform transition-transform duration-300 `}
      /> */}
            <div hidden={!isOpen}>
                <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} />
            </div>
            <div
                className={`${isOpen ? "w-[80%] flex mx-auto" : "w-[100%]"} 
                ${!isOpen ? "" : "pr-6"}
                 transition duration-300  `}
            >
                <ChatScreen isOpen={isOpen} toggleSideBar={toggleSideBar} />
            </div>
        </div>
    );
};

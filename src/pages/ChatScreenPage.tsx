import { useState } from "react";
import { ChatScreen } from "../components/ChatScreen";
import SideBar from "../components/Sidebar";
import { useNavigate } from "react-router";

export const ChatScreenPage = () => {
    const [isDark, setIsDark] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    // const [sideBar, setSideBar] = useState(true);
    const toggleDarkMode = () => {
        setIsDark((prev) => !prev);
    };
    // const ercall = async () => {
    //   throw new Error("async error ig");
    // };
    // ercall();
    // throw new Error("async error ig");

    // throw new Error("teting error");
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
                <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
            </div>
            <div
                className={`${isOpen ? "w-[80%] flex mx-auto" : "w-[100%]"} 
                ${!isOpen ? "" : "pr-6"}
                 transition duration-300  `}
            >
                <ChatScreen
                    isDark={isDark}
                    isOpen={isOpen}
                    toggleMode={toggleDarkMode}
                    toggleSideBar={toggleSideBar}
                />
            </div>
        </div>
    );
};

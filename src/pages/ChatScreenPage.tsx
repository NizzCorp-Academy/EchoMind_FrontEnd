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
                isDark ? "bg-[#1F1C1C] text-white " : " bg-[#1F1C1C]"
            } w-screen h-screen flex`}
        >
            {/* <div
        className={`${!isOpen ? "w-[20%]" : "w-[0%]"}
         bg-yellow-500
          transform transition-transform duration-300 `}
      /> */}
            <div data-testid="side-bar-div-test-id" hidden={!isOpen}>
                <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} />
            </div>
            <div
                data-testid="chat-screen-div-test-id"
                className={`${isOpen ? "w-[80%] flex mx-auto" : "w-[100%]"} 
                ${!isOpen ? "" : "mr-6"}
                 transition duration-300  h-full flex justify-center items-center`}
            >
                <ChatScreen isOpen={isOpen} toggleSideBar={toggleSideBar} />
            </div>
        </div>
    );
};

import { useState } from "react";
import { ChatScreen } from "../components/ChatScreen";
import SideBar from "../components/Sidebar";

export const ChatScreenPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  // const [sideBar, setSideBar] = useState(true);
  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };
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
        className={`${
          !isOpen ? "w-[20%]" : "w-[0%]"
        } bg-yellow-500 transform transition-transform duration-300 `}
      /> */}
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
      <div
        className={`${
          isOpen ? "w-[80%]" : "w-[100%]"
        } mx-auto transition duration-300  `}
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

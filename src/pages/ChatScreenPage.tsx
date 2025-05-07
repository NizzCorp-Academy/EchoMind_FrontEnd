import { useEffect, useState } from "react";
import { ChatScreen } from "../components/ChatScreen";
import Sidebar from "../components/Sidebar";
import { useTheme } from "next-themes";

export const ChatScreenPage = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark" ? true : false;
    const SCREENWIDTH = window.innerWidth;
    const [isOpen, setIsOpen] = useState(SCREENWIDTH < 600 ? false : true);
    const toggleSideBar = () => {
        setIsOpen((prev) => !prev);
    };
    // const [prompt, setPrompt] = useState("");
    const [viewportHeight, setViewportHeight] = useState("100dvh");

    // Handle keyboard visibility
    useEffect(() => {
        // Function to handle viewport changes (keyboard opening/closing)
        const handleVisualViewportResize = () => {
            if (window.visualViewport) {
                const currentHeight = window.visualViewport.height;
                const windowHeight = window.innerHeight;

                // If visual viewport is smaller than window height, keyboard is likely visible
                if (currentHeight < windowHeight * 0.8) {
                    // Using 0.8 as threshold to detect keyboard
                    // Use dynamic viewport height units when available
                    setViewportHeight(`${currentHeight}px`);
                } else {
                    setViewportHeight("100dvh"); // Reset to full dynamic viewport height
                }
            }
        };

        // Add event listener for visual viewport changes
        if (window.visualViewport) {
            window.visualViewport.addEventListener(
                "resize",
                handleVisualViewportResize
            );
        }

        // Fallback for browsers without Visual Viewport API
        window.addEventListener("resize", handleVisualViewportResize);

        // Clean up
        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener(
                    "resize",
                    handleVisualViewportResize
                );
            }
            window.removeEventListener("resize", handleVisualViewportResize);
        };
    }, []);

    return (
        <div
            className={` ${
                isDark ? "bg-[#1F1C1C] text-white " : " bg-[#1F1C1C]"
            } w-screen max-h-[100dvh] h-[100dvh] flex`}
            style={{ height: viewportHeight }}
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
                className={`${
                    isOpen ? "hidden sm:flex w-[80%] mx-auto" : "w-[100%]"
                } 
                ${!isOpen ? "" : "sm:mr-6"}
                 transition duration-300  h-full flex justify-center items-center`}
            >
                <ChatScreen isOpen={isOpen} toggleSideBar={toggleSideBar} />
            </div>
        </div>
    );
};

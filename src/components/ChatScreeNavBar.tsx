import {
    Archive,
    ClockFading,
    LucidePanelLeftOpen,
    Moon,
    Plus,
    Sun,
} from "lucide-react";
import { FaRegEdit, FaRegShareSquare } from "react-icons/fa";
import { MdBookmarkAdd } from "react-icons/md";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router";
import { HiMenuAlt2 } from "react-icons/hi";

const ChatScreeNavBar = ({
    isOpen,
    toggleSideBar,
}: {
    isOpen: boolean;
    toggleSideBar: () => void;
}) => {
    const { setTheme, theme } = useTheme();
    const naviagete = useNavigate();
    const isDark = theme === "dark" ? true : false;
    const bg = isDark ? "bg-dark-plum " : "bg-near-white";
    const logo = isDark
        ? "../src/assets/logo.webp"
        : "../src/assets/logo-black.png";

    return (
        <div
            className={` ${
                isDark
                    ? "text-white border-[1px] border-[#E8ECEF] "
                    : "text-black"
            } w-full h-[70px] select-none rounded-[25px] px-6 ${bg} flex items-center drop-shadow-lg justify-between `}
        >
            {/* new chat button small screen */}
            <div className="block md:hidden" onClick={toggleSideBar}>
                <HiMenuAlt2 size={30} />
            </div>

            <div className=" block sm:hidden">
                <img src={logo} width={120} />
            </div>

            <div
                className="sm:hidden"
                onClick={
                    () => naviagete("/")
                    // isDark ? setTheme("light") : setTheme("dark")
                }
            >
                <FaRegEdit size={30} />
            </div>

            <div className="hidden md:flex space-x-[22px]">
                <div
                    hidden={isOpen}
                    className={`${
                        isDark ? "bg-granite-gray" : "bg-platinum"
                    } w-[30px] h-[30px] flex rounded-[6px] items-center justify-center  p-[1px] pl-[1.5px] pr-[1px]
          `}
                >
                    <div
                        className={`w-full h-full flex gap-1 rounded-[5px] cursor-pointer items-center justify-center
            ${bg}
            `}
                        onClick={toggleSideBar}
                    >
                        <LucidePanelLeftOpen size={20} />
                    </div>
                </div>
                <div
                    hidden={isOpen}
                    onClick={() => naviagete("/")}
                    className={`${
                        isDark ? "bg-granite-gray" : "bg-platinum"
                    } w-[130px] h-[30px] rounded-[16px]  p-[1px] pl-[1.5px] pr-[1px]
          `}
                >
                    <div
                        className={`w-full h-full flex gap-1 rounded-[15px] cursor-pointer items-center justify-center
            ${bg}
            `}
                    >
                        <Plus
                            className={isDark ? "" : "text-green-500"}
                            size={20}
                        />
                        <div>New Chat</div>
                    </div>
                </div>

                <div
                    className={`${
                        isDark
                            ? "bg-gradient-to-r from-harcoal-gray to-granite-gray"
                            : "bg-platinum"
                    } rounded-[30px] w-[30px] flex h-[30px] py-[1px] pr-[0.5px] items-center justify-center`}
                >
                    <div
                        className={`${bg} w-full h-full rounded-[30px] flex items-center cursor-pointer justify-center m-[1px]`}
                    >
                        <ClockFading size={20} />
                    </div>
                </div>
            </div>
            {/* seciton  group */}
            <div className="hidden sm:flex space-x-[50px] lg:pr-[170px] w-full justify-end">
                {/* Dark Mode Switching Start  */}
                <div className=" flex items-center space-x-[8px]">
                    {isDark ? <Moon /> : <Sun />}
                    <div
                        data-testid="chat-nav-bar-toggle-dark-mode"
                        className={`w-[60px] h-[30px] rounded-[92px] cursor-pointer border-2 border-[#E8ECEF] flex items-center px-[2px]
                ${isDark ? "" : "justify-end bg-[#D9D9D9]"}
                `}
                        // onClick={() => toggleRef.current?.click()}
                        onClick={() => {
                            isDark ? setTheme("light") : setTheme("dark");
                            // console.log(theme);
                        }}
                    >
                        <div
                            className={`w-[28px] h-[22px] transition-all  duration-100 bg-[#888888] rounded-[50px]
                ${isDark ? "" : " bg-near-white"}
              `}
                        ></div>
                    </div>
                </div>
                {/* Dark Mode Switching Ending  */}
                {/* nav bar buttons seciton  */}
                <div className=" flex space-x-[24px]">
                    <div
                        className={` rounded-[5px] w-[30px] h-[30px] p-[1px] pr-[1.5px] ${
                            isDark
                                ? "bg-gradient-to-r from-harcoal-gray to-granite-gray"
                                : "bg-platinum"
                        } `}
                    >
                        <div
                            className={`${bg} w-full h-full rounded-[4px] flex items-center justify-center cursor-pointer `}
                        >
                            <MdBookmarkAdd size={20} />
                        </div>
                    </div>
                    <div
                        className={` rounded-[5px] w-[30px] h-[30px] p-[1px] pr-[1.5px] ${
                            isDark
                                ? "bg-gradient-to-r from-harcoal-gray to-granite-gray"
                                : "bg-platinum"
                        } `}
                    >
                        <div
                            className={`${bg} w-full h-full rounded-[4px] flex items-center justify-center cursor-pointer `}
                        >
                            <Archive size={20} />
                        </div>
                    </div>
                    <div
                        className={` rounded-[5px] w-[30px] h-[30px] p-[1px] ${
                            isDark
                                ? "bg-gradient-to-r from-harcoal-gray to-granite-gray"
                                : "bg-platinum"
                        } `}
                    >
                        <div
                            className={`${bg} w-full h-full rounded-[4px] flex items-center justify-center cursor-pointer `}
                        >
                            <FaRegShareSquare size={19} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatScreeNavBar;

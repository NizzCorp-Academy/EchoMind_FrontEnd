/**
 * @file Sidebar.tsx
 * @author Muhammad Haseen
 * @brief Sidebar component for displaying chat history and navigation options.
 *
 * This component handles the sidebar functionality, including displaying chat history,
 * renaming chats, deleting chats, logging out, and navigating between chats.
 * Animations are handled via Framer Motion.
 */
import slideLogo from "../assets/svg/material-symbols-light_door-open-outline.svg";
import logo from "../assets/logo.webp";
import { FaCaretDown } from "react-icons/fa";
import messageIcon from "../assets/svg/message.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { useDeleteChat, useEditChat, useGetChats } from "../hooks/chatHook";
import ChatLoading from "./ChatLoading";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { PopupRecent } from "./PopupRecent";
import { useLogout } from "../hooks/userHook";
import { useTheme } from "next-themes";
import { SidebarProps } from "@/types/misc.types";

/**
 * @brief Sidebar component for managing chat history and navigation.
 *
 * @param toggleSideBar Function to toggle sidebar visibility.
 * @param isOpen Sidebar open/close state.
 * @param location Current route location.
 *
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = ({ toggleSideBar, isOpen }: SidebarProps) => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [renamingChatId, setRenamingChatId] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");

    const { chats, isGettingChat, getChats } = useGetChats();
    const { deleteChat, isDelettingMessage } = useDeleteChat();
    const { editChat, isUpdattingChat } = useEditChat();
    const { removeToken } = useLogout();

    const { chatId: urlId } = useParams();
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark" ? true : false;
    /**
     * @brief Handles deleting a chat by ID.
     *
     * @param chatId The ID of the chat to delete.
     */
    const handleDeleteChat = async (chatId: string) => {
        console.log("delete", chatId);
        deleteChat(chatId);
    };
    /**
     * @brief Fetches chat history and adds event listener for clicks outside menu items.
     */
    useEffect(() => {
        getChats();

        const handleClickOutside = (event: MouseEvent) => {
            const clickedInsideAny = itemRefs.current.some((ref) =>
                ref?.contains(event.target as Node)
            );
            if (!clickedInsideAny) {
                setOpenIndex(null);
                setRenamingChatId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    /**
     * @brief Triggers renaming mode for a chat.
     *
     * @param chatId ID of the chat to rename.
     * @param currentTitle Existing title of the chat.
     */
    const handleEditTitle = (chatId: string, currentTitle: string) => {
        setRenamingChatId(chatId);
        setNewTitle(currentTitle);
        console.log("from to:", currentTitle);
    };

    /**
     * @brief Saves the renamed chat title.
     *
     * @param chatId ID of the chat being renamed.
     */
    const handleRenameSave = async (chatId: string) => {
        console.log("Renamed to:", newTitle);
        editChat(chatId, newTitle);
        setRenamingChatId(null);
    };

    if (isDelettingMessage === true) {
        return (
            <div className="w-[100vw] h-[100dvh] flex justify-center items-center">
                <div className="border-2 rounded-md border-white p-10">
                    <p>Deleting Chat...</p>
                </div>
            </div>
        );
    }

    if (isUpdattingChat === true) {
        return (
            <div className="w-[100vw] h-[100dvh] flex justify-center items-center">
                <div className="border-2 rounded-md border-white p-10">
                    <p>Updating Chat Title...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Sidebar Animation */}
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: isOpen ? 0 : "-100%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{
                    type: "tween",
                    visualDuration: 0.5,
                    bounce: 0.25,
                }}
                className={`w-[100vw] sm:w-[40vw] lg:w-md select-none h-full px-10 text-white relative flex flex-col justify-between ${
                    isDark
                        ? "bg-[#1F1C1C]"
                        : "bg-gradient-to-r from-transparent-purple-black to-[#19053800]"
                }`}
            >
                {/* Sidebar Top Section */}
                <div className="space-y-4 sm:space-y-0">
                    {/* Toggle Sidebar and Logo */}
                    <div className="flex justify-between pt-6 sm:pt-10">
                        <img
                            src={slideLogo}
                            alt="sidebar toggle button"
                            className="cursor-pointer"
                            onClick={() => toggleSideBar()}
                        />
                        <img
                            src={logo}
                            className="w-[8rem] sm:w-fit object-contain "
                            // width={120}
                            alt="Echomind logo"
                        />
                    </div>

                    {/* New Chat Button */}
                    <button
                        onClick={() => navigate(`/`)}
                        className="bg-linear-to-r from-vibrant-violet to-rich-purple w-full font-bold text-2xl sm:mt-10 py-2 sm:py-5 rounded-2xl cursor-pointer"
                    >
                        {"New Chat"}
                    </button>

                    {/* Dark Mode Switching Start  */}
                    <div
                        className=" cursor-pointer bg-white/5 px-3 rounded-xl py-2.5 flex text-lg font-semibold items-center justify-between sm:hidden"
                        onClick={() => {
                            isDark ? setTheme("light") : setTheme("dark");
                        }}
                    >
                        <span> Change Them</span>
                        <div
                            className={`w-[3.5rem] h-[1.8rem] rounded-[6rem] cursor-pointer border-2 border-[#E8ECEF] flex items-center px-[2px]
                ${isDark ? "" : "justify-end bg-[#D9D9D9]"}
                `}
                        >
                            <div
                                className={`w-[1.5rem] h-[1.5rem] transition-all  duration-100 bg-[#888888] rounded-full
                ${isDark ? "" : " bg-near-white"}
              `}
                            ></div>
                        </div>
                    </div>
                    {/* Dark Mode Switching Ending  */}

                    {/* Recent Chats Header */}
                    <div className="flex justify-between sm:mt-10 font-bold sm:mb-10">
                        <div className="flex justify-between items-center gap-2">
                            <FaCaretDown />
                            <span>Recents</span>
                        </div>
                        <PopupRecent />
                    </div>

                    {/* Chat List Section */}
                    <div
                        className={`w-full h-96 lg:max-h-52 md:max-h-96 overflow-y-auto "scroll-recent-Dark"`}
                    >
                        {isGettingChat ? (
                            <ChatLoading />
                        ) : chats?.length === 0 ? (
                            <span>No chat Found</span>
                        ) : (
                            chats &&
                            chats.slice(0, 15).map((chat, index: number) => (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        itemRefs.current[index] = el;
                                    }}
                                    onClick={() => {
                                        if (renamingChatId) return;
                                        navigate(`/chats/${chat._id}`);
                                    }}
                                    className={`relative cursor-pointer flex items-center gap-3 h-10 pl-2 py-6 w-full max-w-md history-div rounded-md hover:bg-slate-50/10 duration-300 ${
                                        String(chat._id) === String(urlId)
                                            ? "bg-[#444C57] border-l-4 border-sky-blue"
                                            : ""
                                    }`}
                                >
                                    {renamingChatId === chat._id ? (
                                        <div className="flex items-center gap-2 w-full">
                                            <input
                                                type="text"
                                                defaultValue={chat.title}
                                                value={newTitle}
                                                onChange={(e) =>
                                                    setNewTitle(e.target.value)
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="rounded px-2 py-1 flex-1"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRenameSave(chat._id);
                                                }}
                                                className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                src={messageIcon}
                                                alt="#"
                                                className="w-5 h-5 shrink-0"
                                            />
                                            <span className="truncate text-sm flex-1">
                                                {chat.title}
                                            </span>
                                            <BsThreeDotsVertical
                                                data-testid="threeDot"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenIndex(
                                                        index === openIndex
                                                            ? null
                                                            : index
                                                    );
                                                }}
                                                className="shrink-0 hidden hoverShow hover:bg-slate-50/10 text-2xl p-2 h-8 w-8 rounded-full"
                                            />
                                            {openIndex === index && (
                                                <ul className="absolute bg-white text-black rounded shadow-md mt-10 p-2 z-50 right-8">
                                                    <li
                                                        className="hover:bg-gray-100 p-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditTitle(
                                                                chat._id,
                                                                chat.title
                                                            );
                                                        }}
                                                    >
                                                        Rename
                                                    </li>
                                                    <li
                                                        className="hover:bg-gray-100 p-1"
                                                        onClick={() =>
                                                            handleDeleteChat(
                                                                chat._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </li>
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sidebar Bottom Section */}
                <div
                    className="py-3 font-semibold sm:font-normal mb-4 sm:mb-3 flex justify-between items-center text-2xl text-white"
                    onClick={() => removeToken()}
                >
                    <span>Logout</span>
                    <MdLogout />
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;

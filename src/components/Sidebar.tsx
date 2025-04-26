/**
 * @file Sidebar.tsx
 * @author Muhammad Haseen
 * @brief Sidebar component for displaying chat history and navigation options.
 *
 * This component handles the sidebar functionality, including displaying chat history,
 * renaming chats, deleting chats, and navigating between chats. It also includes
 * animations for opening and closing the sidebar.
 */

import slideLogo from "../assets/svg/material-symbols-light_door-open-outline.svg";
import logo from "../../public/logo.png";
import { FaCaretDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import messageIcon from "../assets/svg/message.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import ChatHook from "../hooks/chatHook";
import ChatLoading from "./ChatLoading";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import PopupRecent from "./PopupRecent";

/**
 * @brief Sidebar component for managing chat history and navigation.
 *
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = () => {
  const navigate = useNavigate();

  /**
   * @brief State to track the currently open dropdown index.
   */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /**
   * @brief References to chat items for detecting outside clicks.
   */
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * @brief State to track the chat ID being renamed.
   */
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);

  /**
   * @brief State to store the new title for a chat being renamed.
   */
  const [newTitle, setNewTitle] = useState("");

  /**
   * @brief State to track whether the sidebar is open or closed.
   */
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /**
   * @brief State to track the currently selected chat index.
   */
  const [selectedDiv, setSelectedDiv] = useState<number | null>(null);
  const [showRecentTab, setShowRecentTab] = useState<boolean>(false);

  const chatHook = new ChatHook();
  const { chats, isGettingChat, getChats } = chatHook.useGetChats();
  const { deleteChat, isDelettingMessage } = chatHook.useDeleteChat();
  const { editChat, isUpdattingChat } = chatHook.useEditChat();

  /**
   * @brief Handles deleting a chat by its ID.
   *
   * @param {string} chatId - The ID of the chat to delete.
   */
  const handleDeleteChat = async (chatId: string) => {
    console.log("delete", chatId);
    deleteChat(chatId);
  };

  useEffect(() => {
    getChats();

    /**
     * @brief Handles clicks outside of chat items to close dropdowns.
     *
     * @param {MouseEvent} event - The mouse event triggered by the click.
     */
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
   * @brief Handles initiating the renaming of a chat.
   *
   * @param {string} chatId - The ID of the chat to rename.
   * @param {string} currentTitle - The current title of the chat.
   */
  const handleEditTitle = (chatId: string, currentTitle: string) => {
    setRenamingChatId(chatId);
    setNewTitle(currentTitle);
    console.log("from to:", currentTitle);
  };

  /**
   * @brief Handles saving the new title for a chat.
   *
   * @param {string} chatId - The ID of the chat being renamed.
   */
  const handleRenameSave = async (chatId: string) => {
    console.log("Renamed to:", newTitle);
    editChat(chatId, newTitle);
    setRenamingChatId(null);
  };

  if (isDelettingMessage === true) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border-2 rounded-md border-white p-10">
          <p>Deleteing Chat...</p>
        </div>
      </div>
    );
  }
 
  if (isUpdattingChat === true) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border-2 rounded-md border-white p-10">
          <p>Updating Chat Title...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Sidebar Main */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: isSidebarOpen ? 0 : "-100%", opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{
          type: "tween",
          visualDuration: 0.5,
          bounce: 0.25,
        }}
        className="max-w-md bg-black h-screen px-10 text-white relative"
      >
        {/* Top */}
        <div className="flex justify-between pt-10">
          <img
            src={slideLogo}
            alt="sidebar toggle button"
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <img src={logo} alt="Echomind logo" />
        </div>
  
        {/* New Chat Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-linear-to-r from-[#6E27E0] to-[#460F9E] w-full font-bold text-2xl mt-10 py-5 rounded-2xl cursor-pointer"
        >
          New Chat
        </button>
  
        {/* Recents Section */}
        <div className="flex justify-between mt-10 font-bold mb-10">
          <div className="flex justify-between items-center gap-2">
            <FaCaretDown />
            <span>Recents</span>
          </div>
          <span
            className="flex items-center gap-2 font-light text-[#B9BABB] cursor-pointer"
            onClick={() => setShowRecentTab(true)}
          >
            View all <FaArrowRight />
          </span>
        </div>
  
        {/* Chat List */}
        {isGettingChat ? (
          <ChatLoading />
        ) : chats?.length === 0 ? (
          <span>No chat Found</span>
        ) : (
         chats && chats.map((chat, index: number) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => {
                if (renamingChatId) return;
                setSelectedDiv(index);
                navigate(`/${chat._id}`);
              }}
              className={`relative cursor-pointer flex items-center gap-3 h-10 pl-2 py-6 w-full max-w-md history-div rounded-md hover:bg-slate-50/10 duration-300 ${
                selectedDiv === index
                  ? "bg-[#444C57] border-l-4 border-[#7ABCFF]"
                  : ""
              }`}
            >
              {renamingChatId === chat._id ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    defaultValue={chat.title}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
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
                  <img src={messageIcon} alt="#" className="w-5 h-5 shrink-0" />
                  <span className="truncate text-sm flex-1">{chat.title}</span>
                  <BsThreeDotsVertical
                    data-testid="threeDot"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex(index === openIndex ? null : index);
                    }}
                    className="shrink-0 hidden hoverShow hover:bg-slate-50/10 text-2xl p-2 h-8 w-8 rounded-full"
                  />
                  {openIndex === index && (
                    <ul className="absolute bg-white text-black rounded shadow-md mt-10 p-2 z-50 right-8">
                      <li
                        className="hover:bg-gray-100 p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTitle(chat._id, chat.title);
                        }}
                      >
                        Rename
                      </li>
                      <li
                        className="hover:bg-gray-100 p-1"
                        onClick={() => handleDeleteChat(chat._id)}
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
  
        {/* Bottom Section */}
        <div className="absolute bottom-20 left-10 right-10 flex justify-between items-center text-2xl text-white">
          <span>Logout</span>
          <MdLogout />
        </div>
      </motion.div>
  
      {/* PopupRecent Dialog */}
      {showRecentTab && (
        <PopupRecent showRecentTab={showRecentTab} setShowRecentTab={setShowRecentTab} />
      )}
    </>
  );
  
};

export default Sidebar;

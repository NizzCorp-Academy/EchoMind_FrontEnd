/**
 * @file PopupRecent.tsx
 * @brief PopupRecent component for displaying recent chats in a dialog popup.
 * @author Muhammad Haseen
 *
 * This component fetches and displays a list of recent chats inside a popup dialog.
 * It allows the user to navigate to a specific chat by clicking on a chat item.
 */

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FaArrowRight, FaCaretDown } from "react-icons/fa";
import messageIcon from "../assets/svg/message.svg";
import { useNavigate } from "react-router";
import { useGetChats } from "../hooks/chatHook";
import ChatLoading from "./ChatLoading";
import { useEffect } from "react";

/**
 * @brief PopupRecent component for listing recent chats inside a popup dialog.
 *
 * Fetches recent chats and displays them inside a popup.
 * Users can navigate to a selected chat by clicking on it.
 *
 * @returns {JSX.Element} The rendered PopupRecent component.
 */
export function PopupRecent() {
    const navigate = useNavigate();
    const { chats, isGettingChat, getChats } = useGetChats();

    useEffect(() => {
        getChats();
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="flex items-center gap-2 font-light text-[#B9BABB] cursor-pointer">
                    View all <FaArrowRight />
                </span>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md md:max-w-2xl bg-[#140C26] text-white max-h-[75vh] overflow-auto">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <FaCaretDown />
                        <span>Recents</span>
                    </div>
                </DialogHeader>

                <div className="flex flex-col gap-2 mt-4 w-full">
                    {isGettingChat ? (
                        <ChatLoading />
                    ) : chats?.length === 0 ? (
                        <span>No chats found.</span>
                    ) : (
                        chats &&
                        chats.map((chat) => (
                            <DialogClose asChild key={chat._id}>
                                <div
                                    onClick={() =>
                                        navigate(`/chats/${chat._id}`)
                                    }
                                    className="relative cursor-pointer flex items-center gap-3 h-10 pl-2 py-6 w-full rounded-md hover:bg-[#444C57] hover:border-l-4 border-sky-blue duration-300"
                                >
                                    <img
                                        src={messageIcon}
                                        alt="chat"
                                        className="w-5 h-5 shrink-0"
                                    />
                                    <span className="truncate text-sm flex-1">
                                        {chat.title}
                                    </span>
                                </div>
                            </DialogClose>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

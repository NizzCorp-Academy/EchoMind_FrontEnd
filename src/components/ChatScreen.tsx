/**
 * @file ChatScreen.tsx
 * @brief Renders the main chat interface where users interact with their messages and AI responses.
 *
 * This component handles the display of chat messages, message submission, dynamic routing based on chat ID,
 * theme-based styling, and scroll behavior. It interacts with custom chat and user hooks to manage state.
 *
 * @author Jaseem
 */
import ChatScreeNavBar from "../components/ChatScreeNavBar";
import { ArrowUp, CirclePlus } from "lucide-react";
import {
    useGetMessage,
    useDeleteMessage,
    useGetResponse,
} from "../hooks/chatHook";
import { useEffect, useRef, useState } from "react";
import { useGetUser } from "../hooks/userHook";
import { useNavigate, useParams } from "react-router";
import { MdDeleteOutline } from "react-icons/md";
import { useTheme } from "next-themes";

/**
 * @brief Main chat screen component.
 *
 * This component is responsible for fetching and displaying chat messages, handling prompt submission,
 * deleting messages, and auto-scrolling to the most recent message. It also respects user theme preferences.
 *
 * @param {boolean} isOpen - Whether the sidebar is open.
 * @param {() => void} toggleSideBar - Function to toggle the sidebar.
 * @returns {JSX.Element} Rendered ChatScreen component.
 */

export const ChatScreen: React.FC<{
    isOpen: boolean;
    toggleSideBar: () => void;
}> = ({ isOpen, toggleSideBar }) => {
    const { chatId } = useParams();

    const [prompt, setPrompt] = useState("");
    const promptInputRef = useRef<HTMLTextAreaElement>(null);
    const promptEnterButtonRef = useRef<HTMLButtonElement>(null);
    const bottomMessageRef = useRef<HTMLDivElement>(null);

    const { isGettingMessage, messages, getMessages, unSetMessages } =
        useGetMessage();
    const { getResponse, isGettingResponse } = useGetResponse();
    const { deleteMessage, isDelettingMessage } = useDeleteMessage();
    const { user } = useGetUser();
    const { theme } = useTheme();
    const isDark = theme === "dark" ? true : false;

    const bg = isDark
        ? "bg-gradient-to-r from-transparent-purple-black to-[#460F9E00]"
        : "bg-[#F5F5F5]";

    /**
     * @brief Handles submission of a prompt.
     *
     * If the input is not empty, it triggers the AI response fetch and clears the input.
     */

    const handleSubmition = async () => {
        prompt !== "" && (await getResponse(prompt, chatId));
        setPrompt("");
        if (promptInputRef.current) {
            promptInputRef.current.style.height = "50px";
        }
    };

    // Initialize textarea height
    useEffect(() => {
        if (promptInputRef.current) {
            promptInputRef.current.style.height = "auto";
            promptInputRef.current.style.height =
                Math.min(promptInputRef.current.scrollHeight, 150) + "px";
        }
    }, [prompt]);

    const navigate = useNavigate();

    /**
     * @brief Fetches messages when chatId changes or resets messages if no chatId is present.
     */
    useEffect(() => {
        const call = async () => {
            await getMessages(chatId);
        };
        chatId && call();
        !chatId && unSetMessages();
    }, [chatId]);

    /**
     * @brief Listens for 'Enter' key press on the prompt input to trigger submission.
     */

    // useEffect(() => {
    //     const eventFuntion = async (event: KeyboardEvent) => {
    //         if (event.key === "Enter") {
    //             promptEnterButtonRef.current &&
    //                 promptEnterButtonRef.current.click();
    //         }
    //     };

    //     promptInputRef.current &&
    //         promptInputRef.current.addEventListener("keypress", (event) =>
    //             eventFuntion(event)
    //         );

    //     return promptInputRef.current?.removeEventListener(
    //         "keypress",
    //         (event) => eventFuntion(event)
    //     );
    // }, []);
    /**
     * @brief If no chatId is present but messages exist, navigate to the first chat's route.
     */
    useEffect(() => {
        if (!chatId && messages) {
            navigate(`/chats/${messages[0].chatId}`);
        }
    }, [messages]);
    /**
     * @brief Scrolls to the bottom of the chat when new messages arrive.
     */
    useEffect(() => {
        bottomMessageRef.current &&
            bottomMessageRef.current?.scroll({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            className={` w-full h-full md:h-[97%] flex flex-col items-center justify-between relative ${
                isDark ? " text-white " : "  text-black"
            }`}
        >
            <div
                className={`${
                    !isOpen ? " w-[95%] md:w-[80%] flex mx-auto" : "w-full "
                } absolute top-3.5`}
            >
                <ChatScreeNavBar
                    isOpen={isOpen}
                    toggleSideBar={toggleSideBar}
                />
            </div>
            {/* Messages */}
            <div
                data-testid="chat-screen-message-screen-1"
                className={` ${isDark ? "bg-dark-plum " : "bg-[#F5F5F5]"} ${
                    !isOpen
                        ? "w-[95%] md:w-[80%] flex flex-col mx-auto"
                        : "w-full"
                }  h-full overflow-y-auto mt-12 mb-17 mx-auto ${bg}  py-6 `}
            >
                {messages && !isGettingMessage ? (
                    messages.map((message, index) => {
                        return (
                            <div
                                ref={
                                    index === messages.length
                                        ? bottomMessageRef
                                        : null
                                }
                                key={message._id}
                                className={`flex w-full ${
                                    message.isFromUser
                                        ? "justify-end"
                                        : "justify-items-start"
                                } px-4 group`}
                            >
                                <div
                                    // ${ message.isFromUser ? "max-w-full" : "max-w-full" }
                                    className={` flex flex-col max-w-[75%] `}
                                >
                                    <div
                                        // ${message.isFromUser ? "max-w-[50%]" : "max-w-full"}
                                        className={` 
                      px-4 py-2 rounded-xl ${
                          isDark ? "bg-[#754d9dae]" : "bg-[#dedddd]"
                      }`}
                                    >
                                        {message.message}
                                    </div>
                                    <div className="block group-hover:hidden h-6" />
                                    <div className="hidden max-h-6 p-1 group-hover:block gap-2 transition-shadow duration-150">
                                        <div className="h-4 px-8">
                                            <button
                                                data-testid="message-delete-button"
                                                disabled={isDelettingMessage}
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    deleteMessage(message._id)
                                                }
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex w-full h-full items-center justify-center">
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <div className="text-2xl font-semibold flex gap-3">
                                Hai
                                <div
                                    className={` ${
                                        !isDark
                                            ? "bg-gradient-to-r from-vibrant-violet to-rich-purple inline-block text-transparent bg-clip-text"
                                            : "text-sky-blue"
                                    }`}
                                >
                                    {user?.username}
                                </div>
                            </div>
                            <div
                                data-testid="prompt-screen-with-nothing"
                                className=" text-3xl font-bold md:font-normal md:text-5xl lg:font-semibold lg:text-5xl "
                            >
                                How Can I Help You?
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Prompt  */}
            <div
                className={` drop-shadow-lg ${
                    !isOpen ? "w-[95%] md:w-[80%] flex mx-auto" : "w-full"
                }
                      ${
                          isDark ? "bg-[#472c66] " : "bg-near-white"
                      }  min-h-[80px] flex rounded-[25px] items-center justify-between px-[16px] absolute bottom-3 `}
            >
                <div className="flex items-center w-full ">
                    <CirclePlus />
                    {/* <input
                        ref={promptInputRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="px-3 bg-transparent outline-none h-[50px] max-h-[250px]  rounded-[10px] w-full"
                        placeholder="Say Something"
                    /> */}
                    <textarea
                        ref={promptInputRef}
                        value={prompt}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setPrompt(e.target.value)
                        }
                        onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = "auto";
                            target.style.height =
                                Math.min(target.scrollHeight, 150) + "px";
                        }}
                        onKeyDown={(
                            e: React.KeyboardEvent<HTMLTextAreaElement>
                        ) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmition();
                            }
                        }}
                        className="px-3 my-5 bg-transparent outline-none min-h-[50px] max-h-[150px] rounded-[10px] w-full resize-none overflow-y-auto py-3"
                        placeholder="Say Something"
                        rows={1}
                    />
                </div>
                <button
                    ref={promptEnterButtonRef}
                    disabled={isGettingResponse}
                    data-testid="prompt-screen-send-button"
                    className={`w-[30px] h-[30px] rounded-[8px] flex items-center text-white cursor-pointer justify-center ${
                        isDark ? "bg-[#261935]" : "bg-green-500"
                    }`}
                    onClick={() => {
                        handleSubmition();
                    }}
                >
                    <ArrowUp />
                </button>
            </div>
            {/* <div
                hidden={!isOpen}
                className="sm:absolute sm:blur-xl sm:h-full sm:w-full sm:bg-black/50 md:hidden "
            /> */}
        </div>
    );
};

import ChatScreeNavBar from "../components/ChatScreeNavBar";
import { ArrowUp, CirclePlus } from "lucide-react";
import ChatHook from "../hooks/chatHook";
import { useEffect, useRef, useState } from "react";
import { useGetUser } from "../hooks/userHook";
import { useNavigate, useParams } from "react-router";
import { MdDeleteOutline } from "react-icons/md";
import { useTheme } from "next-themes";

export const ChatScreen: React.FC<{
    isOpen: boolean;
    toggleSideBar: () => void;
}> = ({ isOpen, toggleSideBar }) => {
    const { chatId } = useParams();
    // console.log(chatId);
    const [prompt, setPrompt] = useState("");
    const promptInputRef = useRef<HTMLInputElement>(null);
    const promptEnterButtonRef = useRef<HTMLButtonElement>(null);
    const bottomMessageRef = useRef<HTMLDivElement>(null);
    const { useGetMessage, useDeleteMessage, useGetResponse } = new ChatHook();
    const { isGettingMessage, messages, getMessages, unSetMessages } =
        useGetMessage();
    const { getResponse, isGettingResponse } = useGetResponse();
    const { deleteMessage, isDelettingMessage } = useDeleteMessage();
    const { user } = useGetUser();
    const { theme } = useTheme();
    const isDark = theme === "dark" ? false : true;
    //   console.log(prompt);

    const bg = isDark
        ? "bg-gradient-to-r from-[#460F9E4D] to-[#460F9E00]"
        : "bg-[#F5F5F5]";

    const handleSubmition = async () => {
        prompt !== "" && (await getResponse(prompt, chatId));
        setPrompt("");
    };

    const navigate = useNavigate();

    useEffect(() => {
        const call = async () => {
            await getMessages(chatId);
        };
        chatId && call();
        !chatId && unSetMessages();
    }, [chatId]);

    useEffect(() => {
        const eventFuntion = async (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                promptEnterButtonRef.current &&
                    promptEnterButtonRef.current.click();
            }
        };

        promptInputRef.current &&
            promptInputRef.current.addEventListener("keypress", (event) =>
                eventFuntion(event)
            );

        return promptInputRef.current?.removeEventListener(
            "keypress",
            (event) => eventFuntion(event)
        );
    }, []);

    useEffect(() => {
        if (!chatId && messages) {
            navigate(`/chats/${messages[0].chatId}`);
        }
    }, [messages]);

    useEffect(() => {
        bottomMessageRef.current &&
            bottomMessageRef.current?.scroll({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            className={` w-full h-[97%] pt-[12px] flex flex-col items-center justify-between relative ${
                isDark ? " text-white " : "  text-black"
            }`}
        >
            <div
                className={`${
                    !isOpen ? "w-[80%] flex mx-auto" : "w-full "
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
                className={` ${isDark ? "bg-[#29193C] " : "bg-[#F5F5F5]"} ${
                    !isOpen ? "w-[80%] flex flex-col mx-auto" : "w-full"
                }  h-[90%] overflow-y-auto mt-12 mb-17 mx-auto ${bg}  py-6 `}
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
                            <div className="text-2xl flex gap-3">
                                Hai
                                <div className="bg-gradient-to-r from-[#6E27E0] to-[#460F9E] inline-block text-transparent bg-clip-text">
                                    {user?.username}
                                </div>
                            </div>
                            <div
                                data-testid="prompt-screen-with-nothing"
                                className=" text-5xl"
                            >
                                How Can I Help You?
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Prompt  */}
            <div
                className={` ${!isOpen ? "w-[80%] flex mx-auto" : "w-full"}
                      ${
                          isDark ? "bg-[#472c66] " : "bg-[#FEFEFE]"
                      }  min-h-[80px] flex rounded-[25px] items-center justify-between px-[16px] absolute bottom-3 `}
            >
                <div className="flex items-center w-full ">
                    <CirclePlus />
                    <input
                        ref={promptInputRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="px-3 bg-transparent outline-none h-[50px] max-h-[250px]  rounded-[10px] w-full"
                        placeholder="Say Something "
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
        </div>
    );
};

import ChatScreeNavBar from "../components/ChatScreeNavBar";
import { ArrowUp, CirclePlus } from "lucide-react";
import ChatHook from "../hooks/chatHook";
import { useEffect, useState } from "react";
import UserHook from "../hooks/userHook";
import { useParams } from "react-router";
import { MdDeleteOutline } from "react-icons/md";

export const ChatScreen: React.FC<{
  isDark: boolean;
  toggleMode: () => void;
  isOpen: boolean;
  toggleSideBar: () => void;
}> = ({ isDark, toggleMode, isOpen, toggleSideBar }) => {
  //   const { chatId } = useParams();
  const [prompt, setPrompt] = useState("");
  const chatId = "680349077b6f464fef06f6da";
  const { useGetMessage, useDeleteMessage, useGetResponse } = new ChatHook();
  const { useGetUser } = new UserHook();
  const { isGettingMessage, messages, getMessages } = useGetMessage();
  const { getResponse, isGettingResponse } = useGetResponse();
  const { deleteMessage } = useDeleteMessage();
  const { user } = useGetUser();
  //   console.log(prompt);
  const bg = isDark
    ? "bg-gradient-to-r from-[#460F9E4D] to-[#460F9E00]"
    : "bg-[#F5F5F5]";
  useEffect(() => {
    const call = async () => {
      console.log("hellow");
      await getMessages(chatId);
    };
    call();
  }, []);
  return (
    <div
      className={` w-full h-screen pt-[12px] flex flex-col items-center justify-between relative ${
        isDark
          ? "bg-[#29193C] text-white "
          : " bg-gradient-to-r from-[#460F9E4D] to-[#190538]"
      }`}
    >
      <div className="absolute top-3.5">
        <ChatScreeNavBar
          isDark={isDark}
          toggleMode={toggleMode}
          isOpen={isOpen}
          toggleSideBar={toggleSideBar}
        />
      </div>
      {/* Messages */}
      <div
        data-testid="chat-screen-message-screen-1"
        className={` w-[1000px] h-[90%] overflow-y-auto mt-12 mb-17 mx-auto ${bg}  py-6 `}
      >
        {messages ? (
          messages.map((message) => {
            return (
              <div
                key={message._id}
                className={`flex w-full ${
                  message.isFromUser ? "justify-end" : "justify-items-start"
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
                      <div
                        className="cursor-pointer"
                        onClick={() => deleteMessage(message._id)}
                      >
                        <MdDeleteOutline />
                      </div>
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
                  {user?.name}
                  Jaseem
                </div>
              </div>
              <div className=" text-5xl">How Can I Help You?</div>
            </div>
          </div>
        )}
      </div>
      {/* Prompt  */}
      <div
        className={` ${
          isDark ? "bg-[#472c66] " : "bg-[#FEFEFE]"
        } w-[1000px] min-h-[80px] flex rounded-[25px] items-center justify-between px-[16px] overflow-scroll absolute bottom-3 `}
      >
        <div className="flex items-center w-full overflow-scroll">
          <CirclePlus />
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="px-3 bg-transparent outline-none h-[50px] max-h-[250px] overflow-y-auto rounded-[10px] w-full"
            placeholder="Say Something "
          />
        </div>
        <button
          data-testid="prompt-screen-send-button"
          className={`w-[30px] h-[30px] rounded-[8px] flex items-center text-white cursor-pointer justify-center ${
            isDark ? "bg-[#261935]" : "bg-green-500"
          }`}
          onClick={() => getResponse(prompt, chatId)}
        >
          <ArrowUp />
        </button>
      </div>
    </div>
  );
};

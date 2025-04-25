import React from "react";
import ChatHook from "../hooks/chatHook";

export const chatTest = () => {
  const { useGetChats } = new ChatHook();
  const { chats, getChats, isGettingChat } = useGetChats();
  return (
    <div>
      <div>chatTest</div>
    </div>
  );
};

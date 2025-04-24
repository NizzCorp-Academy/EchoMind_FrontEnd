/**
 * @file chatHook
 * @brief file for all the Chat related Hook which are in the ChatHook class
 * @author Jaseem
 */
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  editChatAsyncThunk,
  getResponseAsyncThunk,
  getUserChatsAsyncThunk,
} from "../features/chat/chatSlice";

/**
 * @class ChatHook
 * @brief Provides custom React hooks for chat-related Redux actions and selectors.
 */
class ChatHook {
  /**
   * @brief Custom hook to get chat messages and trigger a response.
   * @returns {Object} An object containing messages, getResponse function, and isGettingResponse flag.
   */
  useGetResponse() {
    const { messages, isGettingResponse } = useSelector(
      (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const getResponse = (prompt: string, chatId?: string) =>
      dispatch(getResponseAsyncThunk({ prompt, chatId }));
    return { messages, getResponse, isGettingResponse };
  }

  /**
   * @brief Custom hook to edit a chat's title.
   * @returns {Object} An object containing chats, editChat function, and isUpdattingChat flag.
   */
  useEditChat() {
    const { chats, isUpdattingChat } = useSelector(
      (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const editChat = (chatId: string, title: string) =>
      dispatch(editChatAsyncThunk({ chatId, title }));
    return { chats, editChat, isUpdattingChat };
  }

  /**
   * @brief Custom hook to fetch user chats.
   * @returns {Object} An object containing chats, getChats function, and isGettingChat flag.
   */
  useGetChats() {
    const { chats, isGettingChat } = useSelector(
      (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const getChats = () => dispatch(getUserChatsAsyncThunk());
    return { chats, getChats, isGettingChat };
  }
  useDeleteMessage(){
    const {messages,isDelettingMessage} =useSelector(
      (state: RootState) => state.chat
    )
    const dispatch = useDispatch<AppDispatch>();
    const deleteMessage = (messageId:string)=>dispatch(deleteMessageAsyncThunk(messageId));
    return {messages,deleteMessage,isDelettingMessage}
  }
  useDeleteChat() {
    const { chats, isDelettingMessage } = useSelector(
      (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const deleteChat = (chatId: string) => dispatch(deleteChatAsyncThunk(chatId));
  
    return {  chats, deleteChat, isDelettingMessage };
  }
  
  useGetMessage() {
    const { messages, isGettingMessage } = useSelector(
      (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const getMessages = (chatId:string) => dispatch(getChatMessageAsyncThunk(chatId));
    return { messages, getMessages, isGettingMessage };
  }
}

export default ChatHook;

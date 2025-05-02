/**
 * @file chatHook
 * @brief file for all the Chat related Hook which are in the ChatHook class
 * @author Jaseem
 * @author Muhammad Haseen
 */
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
    deleteChatAsyncThunk,
    deleteMessageAsyncThunk,
    editChatAsyncThunk,
    getChatMessageAsyncThunk,
    getResponseAsyncThunk,
    getUserChatsAsyncThunk,
} from "../features/chat/chatSlice";

/**
 * @class ChatHook
 * @brief Provides custom React hooks for chat-related Redux actions and selectors.
 */

/**
 * @brief Custom hook to get chat messages and trigger a response.
 * @returns {Object} An object containing messages, getResponse function, and isGettingResponse flag.
 */
export const useGetResponse = () => {
    const { messages, isGettingResponse } = useSelector(
        (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const getResponse = (prompt: string, chatId?: string) =>
        dispatch(getResponseAsyncThunk({ prompt, chatId }));
    return { messages, getResponse, isGettingResponse };
};

/**
 * @brief Custom hook to edit a chat's title.
 * @returns {Object} An object containing chats, editChat function, and isUpdattingChat flag.
 */
export const useEditChat = () => {
    const { chats, isUpdattingChat } = useSelector(
        (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const editChat = (chatId: string, title: string) =>
        dispatch(editChatAsyncThunk({ chatId, title }));
    return { chats, editChat, isUpdattingChat };
};

/**
 * @brief Custom hook to fetch user chats.
 * @returns {Object} An object containing chats, getChats function, and isGettingChat flag.
 */
export const useGetChats = () => {
    const { chats, isGettingChat } = useSelector(
        (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();

    const getChats = () => dispatch(getUserChatsAsyncThunk());
    return { chats, getChats, isGettingChat };
};
/**
 * @brief Custom hook to delete a message from the chat.
 * @returns An object containing messages, a function to delete a message, and deletion state.
 */
export const useDeleteMessage = () => {
    const { messages, isDelettingMessage } = useSelector(
        (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const deleteMessage = (messageId: string) =>
        dispatch(deleteMessageAsyncThunk(messageId));
    return { messages, deleteMessage, isDelettingMessage };
};
/**
 * @brief Custom hook to delete a chat.
 * @returns An object containing chats, a function to delete a chat, and message deletion state.
 */
export const useDeleteChat = () => {
    const { chats, isDelettingMessage } = useSelector(
        (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const deleteChat = (chatId: string) =>
        dispatch(deleteChatAsyncThunk(chatId));

    return { chats, deleteChat, isDelettingMessage };
};
/**
 * @brief Custom hook to get messages for a chat.
 * @returns An object containing messages, a function to fetch messages, and fetch state.
 */
export const useGetMessage = () => {
    const { messages, isGettingMessage } = useSelector(
        (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const unSetMessages = () => {
        dispatch({ type: "chat/unSetMessages" });
    };
    const getMessages = (chatId?: string) =>
        dispatch(getChatMessageAsyncThunk(chatId));
    return { messages, getMessages, isGettingMessage, unSetMessages };
};

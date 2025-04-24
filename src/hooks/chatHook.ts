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

class ChatHook {
  useGetResponse() {
    const { messages, isGettingResponse } = useSelector(
      (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const getResponse = (prompt: string, chatId?: string) =>
      dispatch(getResponseAsyncThunk({ prompt, chatId }));
    return { messages, getResponse, isGettingResponse };
  }
  useEditChat() {
    const { chats, isUpdattingChat } = useSelector(
      (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const editChat = (chatId: string, title: string) =>
      dispatch(editChatAsyncThunk({ chatId, title }));
    return { chats, editChat, isUpdattingChat };
  }
  useGetChats() {
    const { chats, isGettingChat } = useSelector(
      (state: RootState) => state.chat
    );
    const dispatch = useDispatch<AppDispatch>();
    const getChats = () => dispatch(getUserChatsAsyncThunk());
    return { chats, getChats, isGettingChat };
  }
}

export default ChatHook;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatService from "../../services/chatService";

export interface ChatState {
  error: any;
  chats:
    | { _id: string; title: string; createdAt: string; updatedAt: string }[]
    | undefined;
  isGettingChat: boolean;
  isUpdattingChat: boolean;
  isDelettingChat: boolean;
  isGettingMessage: boolean;
  isDelettingMessage: boolean;
  isGettingResponse: boolean;
  messages:
    | { isFromUser: boolean; _id: string; chatId: string; message: string }[]
    | undefined;
}

const initialState: ChatState = {
  chats: undefined,
  error: null,
  messages: undefined,
  isDelettingChat: false,
  isDelettingMessage: false,
  isGettingChat: false,
  isGettingResponse: false,
  isGettingMessage: false,
  isUpdattingChat: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getResponseAsyncThunk.pending, (state) => {
        state.isGettingResponse = true;
      })
      .addCase(getResponseAsyncThunk.fulfilled, (state, action) => {
        state.isGettingResponse = false;
        if (action.payload) {
          if (!state.messages) state.messages = [];
          state.messages.push(action.payload);
        }
      })
      .addCase(getResponseAsyncThunk.rejected, (state, action) => {
        state.isGettingResponse = false;
        state.error = action.payload;
      })
      .addCase(getUserChatsAsyncThunk.pending, (state) => {
        state.chats = undefined;
        state.isGettingChat = true;
      })
      .addCase(getUserChatsAsyncThunk.fulfilled, (state, action) => {
        state.isGettingChat = false;
        state.chats = action.payload;
      })
      .addCase(getUserChatsAsyncThunk.rejected, (state, action) => {
        state.isGettingChat = false;
        state.error = action.payload;
      })
      .addCase(getChatMessageAsyncThunk.pending, (state) => {
        state.messages = undefined;
        state.isGettingMessage = true;
      })
      .addCase(getChatMessageAsyncThunk.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.isGettingMessage = false;
      })
      .addCase(getChatMessageAsyncThunk.rejected, (state, action) => {
        state.isGettingMessage = false;
        state.error = action.payload;
      })
      .addCase(editChatAsyncThunk.pending, (state) => {
        state.isUpdattingChat = true;
      })
      .addCase(editChatAsyncThunk.fulfilled, (state, action) => {
        state.isUpdattingChat = false;
        if (state.chats) {
          const chat = state.chats.find((c) => c._id === action.payload.chatId);
          if (chat) {
            chat.title = action.payload.title;
          }
        }
      })
      .addCase(editChatAsyncThunk.rejected, (state, action) => {
        state.isUpdattingChat = false;
        state.error = action.payload;
      })
      .addCase(deleteChatAsyncThunk.pending, (state) => {
        state.isDelettingChat = true;
      })
      .addCase(deleteChatAsyncThunk.fulfilled, (state, action) => {
        state.isDelettingChat = false;
        if (state.chats) {
          state.chats = state.chats.filter(
            (chat) => chat._id !== action.payload
          );
        }
      })
      .addCase(deleteChatAsyncThunk.rejected, (state, action) => {
        state.isDelettingChat = false;
        state.error = action.payload;
      })
      .addCase(deleteMessageAsyncThunk.pending, (state) => {
        state.isDelettingMessage = true;
      })
      .addCase(deleteMessageAsyncThunk.fulfilled, (state, action) => {
        state.isDelettingMessage = false;
        if (state.messages) {
          state.messages = state.messages.filter(
            (message) => message._id !== action.payload
          );
        }
      })
      .addCase(deleteMessageAsyncThunk.rejected, (state, action) => {
        state.isDelettingMessage = false;
        state.error = action.payload;
      });
  },
});

export const getResponseAsyncThunk = createAsyncThunk(
  "chat/getResponse",
  async (
    { prompt, chatId }: { prompt: string; chatId?: string },
    { rejectWithValue }
  ) => {
    const chatService = new ChatService();
    const { error, data } = await chatService.chatCompletion(
      { prompt },
      chatId
    );
    if (error) {
      return rejectWithValue(error);
    }
    return data;
  }
);

export const getUserChatsAsyncThunk = createAsyncThunk(
  "chat/getUserChats",
  async ({}, { rejectWithValue }) => {
    const chatService = new ChatService();
    const { data, error } = await chatService.getUserChats();
    if (error) {
      return rejectWithValue(error);
    }
    return data;
  }
);

export const getChatMessageAsyncThunk = createAsyncThunk(
  "chat/getChatMessages",
  async (chatId: string, { rejectWithValue }) => {
    const chatService = new ChatService();
    const { data, error } = await chatService.getMessages(chatId);
    if (error) {
      rejectWithValue(error);
    }
    return data;
  }
);

export const editChatAsyncThunk = createAsyncThunk(
  "chat/editChat",
  async (
    { chatId, title }: { chatId: string; title: string },
    { rejectWithValue }
  ) => {
    const chatService = new ChatService();
    const { error } = await chatService.editChat(chatId, { title });
    if (error) {
      rejectWithValue(error);
    }
    const data = { chatId, title };
    return data;
  }
);

export const deleteChatAsyncThunk = createAsyncThunk(
  "chat/deleteChat",
  async (chatId: string, { rejectWithValue }) => {
    const chatService = new ChatService();
    const { error } = await chatService.deleteChat(chatId);
    if (error) {
      rejectWithValue(error);
    }
    return chatId;
  }
);

export const deleteMessageAsyncThunk = createAsyncThunk(
  "chat/deleteMessage",
  async (messageId: string, { rejectWithValue }) => {
    const chatService = new ChatService();
    const { error } = await chatService.deleteMessage(messageId);
    if (error) {
      rejectWithValue(error);
    }
    return messageId;
  }
);

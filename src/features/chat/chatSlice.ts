/**
 * @file chatSlice.ts
 * @brief Redux slice and async thunks for chat feature state management.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChatService from "../../services/chatService";

/**
 * @interface ChatState
 * @brief Represents the state structure for chat feature.
 * @property error Error object or null.
 * @property chats List of chat objects or undefined.
 * @property isGettingChat Indicates if chats are being fetched.
 * @property isUpdattingChat Indicates if a chat is being updated.
 * @property isDelettingChat Indicates if a chat is being deleted.
 * @property isGettingMessage Indicates if messages are being fetched.
 * @property isDelettingMessage Indicates if a message is being deleted.
 * @property isGettingResponse Indicates if a chat response is being fetched.
 * @property messages List of message objects or undefined.
 */
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

/**
 * @var initialState
 * @brief Initial state for the chat slice.
 */
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

/**
 * @brief Redux slice for chat state.
 */
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

/**
 * @brief Async thunk to get chat response.
 * @param {Object} params - Parameters for chat completion.
 * @param {string} params.prompt - User prompt.
 * @param {string} [params.chatId] - Optional chat ID.
 * @returns {Promise<any>} Chat response data.
 */
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

/**
 * @brief Async thunk to fetch user chats.
 * @returns {Promise<any>} List of user chats.
 */
export const getUserChatsAsyncThunk = createAsyncThunk(
  "chat/getUserChats",
  async (_, { rejectWithValue }) => {
    console.log("call is getting to the slice");
    const chatService = new ChatService();
    const { data, error } = await chatService.getUserChats();
    if (error) {
      return rejectWithValue(error);
    }
    return data;
  }
);

/**
 * @brief Async thunk to fetch messages for a chat.
 * @param {string} chatId - Chat ID.
 * @returns {Promise<any>} List of messages for the chat.
 */
export const getChatMessageAsyncThunk = createAsyncThunk(
  "chat/getChatMessages",
  async (chatId: string | undefined, { rejectWithValue }) => {
    const chatService = new ChatService();
    const { data, error } = await chatService.getMessages(chatId);
    if (error) {
      rejectWithValue(error);
    }
    return data;
  }
);

/**
 * @brief Async thunk to edit a chat's title.
 * @param {Object} params - Parameters for editing chat.
 * @param {string} params.chatId - Chat ID.
 * @param {string} params.title - New chat title.
 * @returns {Promise<any>} Updated chat data.
 */
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

/**
 * @brief Async thunk to delete a chat.
 * @param {string} chatId - Chat ID.
 * @returns {Promise<string>} Deleted chat ID.
 */
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

/**
 * @brief Async thunk to delete a message.
 * @param {string} messageId - Message ID.
 * @returns {Promise<string>} Deleted message ID.
 */
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

/**
 * @brief Default export for chat reducer.
 */
export default chatSlice.reducer;

import { describe, it, expect } from "vitest";
import {
    getResponseAsyncThunk,
    getUserChatsAsyncThunk,
    editChatAsyncThunk,
    deleteChatAsyncThunk,
    chatSlice,
    deleteMessageAsyncThunk,
} from "../features/chat/chatSlice";
import { ChatState } from "@/types/chat.types";

getResponseAsyncThunk;

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

describe("chatSlice reducer", () => {
    it("should return the initial state", () => {
        expect(chatSlice.reducer(undefined, { type: "" })).toEqual(
            initialState
        );
    });

    it("should handle getUserChatsAsyncThunk.pending", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: getUserChatsAsyncThunk.pending.type,
        });
        expect(nextState.isGettingChat).toBe(true);
        expect(nextState.chats).toBe(undefined);
    });

    it("should handle getUserChatsAsyncThunk.fulfilled", () => {
        const mockChats = [
            { _id: "1", title: "Chat 1", createdAt: "", updatedAt: "" },
        ];
        const nextState = chatSlice.reducer(initialState, {
            type: getUserChatsAsyncThunk.fulfilled.type,
            payload: mockChats,
        });
        expect(nextState.isGettingChat).toBe(false);
        expect(nextState.chats).toEqual(mockChats);
    });

    it("should handle getUserChatsAsyncThunk.rejected", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: getUserChatsAsyncThunk.rejected.type,
            payload: "Failed to fetch chats",
        });
        expect(nextState.isGettingChat).toBe(false);
    });

    it("should handle getResponseAsyncThunk.pending", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: getResponseAsyncThunk.pending.type,
        });
        expect(nextState.isGettingResponse).toBe(true);
    });

    it("should handle getResponseAsyncThunk.fulfilled", () => {
        const mockPayload = {
            userMessage: {
                isFromUser: true,
                _id: "123",
                chatId: "chat1",
                message: "Hello!",
            },
            responseMessage: {
                isFromUser: false,
                _id: "124",
                chatId: "chat1",
                message: "Hi there!",
            },
        };

        const nextState = chatSlice.reducer(initialState, {
            type: getResponseAsyncThunk.fulfilled.type,
            payload: mockPayload,
        });

        expect(nextState.isGettingResponse).toBe(false);
        expect(nextState.messages).toHaveLength(2);
        expect(nextState.messages?.[0]).toEqual(mockPayload.userMessage);
        expect(nextState.messages?.[1]).toEqual(mockPayload.responseMessage);
    });

    it("should handle getResponseAsyncThunk.rejected", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: getResponseAsyncThunk.rejected.type,
            payload: "Error generating response",
        });
        expect(nextState.isGettingResponse).toBe(false);
    });
    it("should handle editChatAsyncThunk.pending", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: editChatAsyncThunk.pending.type,
        });
        expect(nextState.isUpdattingChat).toBe(true);
    });

    it("should handle editChatAsyncThunk.fulfilled", () => {
        const prevState = {
            ...initialState,
            chats: [
                { _id: "1", title: "Old Title", createdAt: "", updatedAt: "" },
            ],
        };
        // The payload should match what the reducer expects: { chatId, title }
        const payload = { chatId: "1", title: "New Title" };
        const nextState = chatSlice.reducer(prevState, {
            type: editChatAsyncThunk.fulfilled.type,
            payload,
        });
        expect(nextState.isUpdattingChat).toBe(false);
        expect(nextState.chats?.[0].title).toBe("New Title");
    });

    it("should handle editChatAsyncThunk.rejected", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: editChatAsyncThunk.rejected.type,
            payload: "Edit failed",
        });
        expect(nextState.isUpdattingChat).toBe(false);
    });
    it("should handle deleteChatAsyncThunk.pending", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: deleteChatAsyncThunk.pending.type,
        });
        expect(nextState.isDelettingChat).toBe(true);
    });

    it("should handle deleteChatAsyncThunk.fulfilled", () => {
        const prevState = {
            ...initialState,
            chats: [
                { _id: "1", title: "Keep", createdAt: "", updatedAt: "" },
                { _id: "2", title: "Delete", createdAt: "", updatedAt: "" },
            ],
        };
        const nextState = chatSlice.reducer(prevState, {
            type: deleteChatAsyncThunk.fulfilled.type,
            payload: "2",
        });
        expect(nextState.isDelettingChat).toBe(false);
        expect(nextState.chats?.find((c) => c._id === "2")).toBeUndefined();
    });

    it("should handle deleteChatAsyncThunk.rejected", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: deleteChatAsyncThunk.rejected.type,
            payload: "Delete failed",
        });
        expect(nextState.isDelettingChat).toBe(false);
    });
    it("should handle deleteMessageAsyncThunk.pending", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: deleteMessageAsyncThunk.pending.type,
        });
        expect(nextState.isDelettingMessage).toBe(true);
    });

    it("should handle deleteMessageAsyncThunk.fulfilled", () => {
        const prevState = {
            ...initialState,
            messages: [
                { _id: "m1", chatId: "c1", message: "Keep", isFromUser: true },
                {
                    _id: "m2",
                    chatId: "c1",
                    message: "Delete",
                    isFromUser: false,
                },
            ],
        };
        const nextState = chatSlice.reducer(prevState, {
            type: deleteMessageAsyncThunk.fulfilled.type,
            payload: "m2",
        });
        expect(nextState.isDelettingMessage).toBe(false);
        expect(nextState.messages?.find((m) => m._id === "m2")).toBeUndefined();
    });

    it("should handle deleteMessageAsyncThunk", () => {
        const nextState = chatSlice.reducer(initialState, {
            type: deleteMessageAsyncThunk.rejected.type,
            payload: "Message delete error",
        });
        expect(nextState.isDelettingMessage).toBe(false);
    });
});

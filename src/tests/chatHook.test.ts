import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import ChatHook from "../hooks/chatHook";

// Mock react-redux
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// Mock thunks
const mockDispatch = vi.fn();
const mockThunk = vi.fn();

vi.mock("../../features/chat/chatSlice", () => ({
  deleteChatAsyncThunk: mockThunk,
  deleteMessageAsyncThunk: mockThunk,
  editChatAsyncThunk: mockThunk,
  getChatMessageAsyncThunk: mockThunk,
  getResponseAsyncThunk: mockThunk,
  getUserChatsAsyncThunk: mockThunk,
}));

describe("ChatHook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as vi.Mock).mockReturnValue(mockDispatch);
  });

  it("useGetResponse returns correct values and dispatches thunk", () => {
    (useSelector as unknown as vi.Mock).mockImplementation((cb) =>
      cb({ chat: { messages: ["msg"], isGettingResponse: false } })
    );
    const hook = new ChatHook();
    const { messages, getResponse, isGettingResponse } = hook.useGetResponse();
    expect(messages).toEqual(["msg"]);
    expect(isGettingResponse).toBe(false);
    getResponse("prompt", "chatId");
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("useEditChat returns correct values and dispatches thunk", () => {
    (useSelector as unknown as vi.Mock).mockImplementation((cb) =>
      cb({ chat: { chats: ["chat"], isUpdattingChat: true } })
    );
    const hook = new ChatHook();
    const { chats, editChat, isUpdattingChat } = hook.useEditChat();
    expect(chats).toEqual(["chat"]);
    expect(isUpdattingChat).toBe(true);
    editChat("id", "title");
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("useGetChats returns correct values and dispatches thunk", () => {
    (useSelector as unknown as vi.Mock).mockImplementation((cb) =>
      cb({ chat: { chats: ["chat"], isGettingChat: true } })
    );
    const hook = new ChatHook();
    const { chats, getChats, isGettingChat } = hook.useGetChats();
    expect(chats).toEqual(["chat"]);
    expect(isGettingChat).toBe(true);
    getChats();
    expect(mockDispatch).toHaveBeenCalled();
  });
});

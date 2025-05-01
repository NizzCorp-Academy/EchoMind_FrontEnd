import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import  { useDeleteChat, useDeleteMessage, useEditChat, useGetChats, useGetMessage, useGetResponse } from "../hooks/chatHook";


vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
}));


const mockDispatch = vi.fn();
const mockThunk = vi.fn(() => () => {});

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
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it("useGetResponse returns correct values and dispatches thunk", () => {
    (useSelector as unknown as Mock).mockImplementation((cb:any) =>
      cb({ chat: { messages: ["msg"], isGettingResponse: false } })
    );
    
    const { messages, getResponse, isGettingResponse } =useGetResponse();
    expect(messages).toEqual(["msg"]);
    expect(isGettingResponse).toBe(false);
    getResponse("prompt", "chatId");
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("useEditChat returns correct values and dispatches thunk", () => {
    (useSelector as unknown as Mock).mockImplementation((cb:any) =>
      cb({ chat: { chats: ["chat"], isUpdattingChat: true } })
    );

    const { chats, editChat, isUpdattingChat } = useEditChat();
    expect(chats).toEqual(["chat"]);
    expect(isUpdattingChat).toBe(true);
    editChat("id", "title");
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("useGetChats returns correct values and dispatches thunk", () => {
    (useSelector as unknown as Mock).mockImplementation((cb:any) =>
      cb({ chat: { chats: ["chat"], isGettingChat: true } })
    );
    
    const { chats, getChats, isGettingChat } =useGetChats();
    expect(chats).toEqual(["chat"]);
    expect(isGettingChat).toBe(true);
    getChats();
    expect(mockDispatch).toHaveBeenCalled();
  });
  it("useGetMessage returns correct values and dispatches thunk", () => {
    (useSelector as unknown as Mock).mockImplementation((cb:any) =>
      cb({ chat: { messages: ["chat"], isGettingMessage: true } })
    );
    
    const {messages, getMessages, isGettingMessage } =useGetMessage();
    expect(messages).toEqual(["chat"]);
    expect(isGettingMessage).toBe(true);
    getMessages("123");
    expect(mockDispatch).toHaveBeenCalled();
  });
  it("useDeleteMessage returns correct values and dispatches thunk", () => {
    (useSelector as unknown as Mock).mockImplementation((cb:any) =>
      cb({ chat: { messages: ["msg"], isDelettingMessage: true } })
    );
    
    const { messages, deleteMessage, isDelettingMessage } =useDeleteMessage();
    expect(messages).toEqual(["msg"]);
    expect(isDelettingMessage).toBe(true);
    deleteMessage("msgId");
    expect(mockDispatch).toHaveBeenCalled();
  });
  it("useDeleteChat returns correct values and dispatches thunk", () => {
    (useSelector as unknown as Mock).mockImplementation((cb:any) =>
      cb({ chat: { chats: ["chat"], isDelettingMessage: true } })
    );
    
    const { chats, deleteChat, isDelettingMessage } =useDeleteChat();
    expect(chats).toEqual(["chat"]);
    expect(isDelettingMessage).toBe(true);
    deleteChat("msgId");
    expect(mockDispatch).toHaveBeenCalled();
  });
 
  
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ChatService from "../services/chatService";
import AxiosClass from "../utils/axios";

vi.mock("../utils/axios", () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe("ChatService", () => {
  let chatService: ChatService;

  beforeEach(() => {
    chatService = new ChatService();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get user chats (success)", async () => {
    const mockChats = [
      { title: "Test", _id: "1", createdAt: "", updatedAt: "" },
    ];
    (AxiosClass.get as any).mockResolvedValueOnce({
      status: "success",
      chats: mockChats,
    });

    const result = await chatService.getUserChats();

    expect(AxiosClass.get).toHaveBeenCalledWith("/chat/getchat");
    expect(result.data).toEqual(mockChats);
    expect(result.error).toBeUndefined();
  });

  it("should get user chats (error)", async () => {
    (AxiosClass.get as any).mockResolvedValueOnce({
      status: "error",
      message: "Some error",
      errorCode: "ERR",
    });

    const result = await chatService.getUserChats();

    expect(AxiosClass.get).toHaveBeenCalledWith("/chat/getchat");
    expect(result.data).toBeUndefined();
    expect(result.error).toBe("Some error");
  });

  it("should delete chat (success)", async () => {
    (AxiosClass.delete as any).mockResolvedValueOnce({
      status: "success",
    });

    const result = await chatService.deleteChat("123");

    expect(AxiosClass.delete).toHaveBeenCalledWith("/chat/123");
    expect(result.data).toBeUndefined();
    expect(result.error).toBeUndefined();
  });

  it("should delete chat (error)", async () => {
    (AxiosClass.delete as any).mockResolvedValueOnce({
      status: "error",
      message: "Delete failed",
      errorCode: "ERR",
    });

    const result = await chatService.deleteChat("123");

    expect(AxiosClass.delete).toHaveBeenCalledWith("/chat/123");
    expect(result.data).toBeUndefined();
    expect(result.error).toBe("Delete failed");
  });

  it("should edit chat (success)", async () => {
    (AxiosClass.put as any).mockResolvedValueOnce({
      status: "success",
    });

    const result = await chatService.editChat("123", { title: "Updated Chat" });

    expect(AxiosClass.put).toHaveBeenCalledWith("/chat/edit/123", {
      title: "Updated Chat",
    });
    expect(result.data).toBeUndefined();
    expect(result.error).toBeUndefined();
  });

  it("should edit chat (error)", async () => {
    (AxiosClass.put as any).mockResolvedValueOnce({
      status: "error",
      message: "Edit failed",
      errorCode: "ERR",
    });

    const result = await chatService.editChat("123", { title: "Updated Chat" });

    expect(AxiosClass.put).toHaveBeenCalledWith("/chat/edit/123", {
      title: "Updated Chat",
    });
    expect(result.data).toBeUndefined();
    expect(result.error).toBe("Edit failed");
  });

  it("should handle chat completion (success)", async () => {
    const mockResponse = {
      _id: "1",
      isFromUser: false,
      message: "Hello",
      chatId: "c1",
    };
    (AxiosClass.post as any).mockResolvedValueOnce({
      status: "success",
      response: mockResponse,
    });

    const result = await chatService.chatCompletion({ prompt: "Hi" }, "c1");

    expect(AxiosClass.post).toHaveBeenCalledWith("/chat/completion/c1", {
      prompt: "Hi",
    });
    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeUndefined();
  });

  it("should handle chat completion (error)", async () => {
    (AxiosClass.post as any).mockResolvedValueOnce({
      status: "error",
      message: "Completion failed",
      errorCode: "ERR",
    });

    const result = await chatService.chatCompletion({ prompt: "Hi" }, "c1");

    expect(AxiosClass.post).toHaveBeenCalledWith("/chat/completion/c1", {
      prompt: "Hi",
    });
    expect(result.data).toBeUndefined();
    expect(result.error).toBe("Completion failed");
  });

  it("should handle chat completion without chatId", async () => {
    const mockResponse = {
      _id: "1",
      isFromUser: false,
      message: "Hello",
      chatId: "c1",
    };
    (AxiosClass.post as any).mockResolvedValueOnce({
      status: "success",
      response: mockResponse,
    });

    const result = await chatService.chatCompletion({ prompt: "Hi" });

    expect(AxiosClass.post).toHaveBeenCalledWith("/chat/completion/undefined", {
      prompt: "Hi",
    });
    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeUndefined();
  });

  it("should delete message (success)", async () => {
    (AxiosClass.delete as any).mockResolvedValueOnce({
      status: "success",
    });

    const result = await chatService.deleteMessage("msg1");

    expect(AxiosClass.delete).toHaveBeenCalledWith("/messages/msg1");
    expect(result.data).toBeUndefined();
    expect(result.error).toBeUndefined();
  });

  it("should delete message (error)", async () => {
    (AxiosClass.delete as any).mockResolvedValueOnce({
      status: "error",
      message: "Delete message failed",
      errorCode: "ERR",
    });

    const result = await chatService.deleteMessage("msg1");

    expect(AxiosClass.delete).toHaveBeenCalledWith("/messages/msg1");
    expect(result.data).toBeUndefined();
    expect(result.error).toBe("Delete message failed");
  });

  it("should get messages (success)", async () => {
    const mockMessages = [
      { _id: "1", isFromUser: true, message: "Hi", chatId: "c1" },
    ];
    (AxiosClass.get as any).mockResolvedValueOnce({
      status: "success",
      messages: mockMessages,
    });

    const result = await chatService.getMessages("c1");

    expect(AxiosClass.get).toHaveBeenCalledWith("/messages/c1");
    expect(result.data).toEqual(mockMessages);
    expect(result.error).toBeUndefined();
  });

  it("should get messages (error)", async () => {
    (AxiosClass.get as any).mockResolvedValueOnce({
      status: "error",
      message: "Failed",
      errorCode: "ERR",
    });

    const result = await chatService.getMessages("c1");

    expect(AxiosClass.get).toHaveBeenCalledWith("/messages/c1");
    expect(result.data).toBeUndefined();
    expect(result.error).toBe("Failed");
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ChatService from "../utils/chatService";
describe("ChatService", () => {
  let chatService: ChatService;
  let mockGet: any;
  let mockDelete: any;

  beforeEach(() => {
    chatService = new ChatService();
    mockGet = vi.spyOn(chatService.axios, "get");
    mockDelete = vi.spyOn(chatService.axios, "delete");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get user chats", async () => {
    const mockResponse = { data: ["chat1", "chat2"] };
    mockGet.mockResolvedValue(mockResponse);

    const result = await chatService.getUserChats();

    expect(mockGet).toHaveBeenCalledWith("/chat/getchat", {});
    expect(result).toBe(mockResponse);
  });

  it("should delete chat", async () => {
    const mockResponse = { data: "deleted" };
    const formData = { chatId: "123" };
    mockDelete.mockResolvedValue(mockResponse);

    const result = await chatService.deleteChat(formData);

    expect(mockDelete).toHaveBeenCalledWith("/chat/delete", formData);
    expect(result).toBe(mockResponse);
  });

  it("should edit chat", async () => {
    const mockResponse = { data: "edited" };
    const formData = { chatId: "123", text: "updated" };
    mockDelete.mockResolvedValue(mockResponse);

    const result = await chatService.editChat(formData);

    expect(mockDelete).toHaveBeenCalledWith("/chat/delete", formData);
    expect(result).toBe(mockResponse);
  });

  it("should handle chat completion", async () => {
    const mockResponse = { data: "completion" };
    const formData = { prompt: "test" };
    mockDelete.mockResolvedValue(mockResponse);

    const result = await chatService.chatCompletion(formData);

    expect(mockDelete).toHaveBeenCalledWith("/chat/completion", formData);
    expect(result).toBe(mockResponse);
  });

  it("should delete message", async () => {
    const mockResponse = { data: "message deleted" };
    const formData = { messageId: "123" };
    mockDelete.mockResolvedValue(mockResponse);

    const result = await chatService.deleteMessage(formData);

    expect(mockDelete).toHaveBeenCalledWith("/messages/delete", formData);
    expect(result).toBe(mockResponse);
  });

  it("should get messages", async () => {
    const mockResponse = { data: ["message1", "message2"] };
    mockGet.mockResolvedValue(mockResponse);

    const result = await chatService.getMessages();

    expect(mockGet).toHaveBeenCalledWith("/messages/getall", {});
    expect(result).toBe(mockResponse);
  });
});

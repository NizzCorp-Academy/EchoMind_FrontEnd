import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ChatService from "../utils/chatService";
describe("ChatService", () => {
  let chatService: ChatService;
  let mockGet: any;
  let mockPost: any;
  let mockPut: any;
  let mockDelete: any;

  beforeEach(() => {
    chatService = new ChatService();
    mockGet = vi.spyOn(chatService.axios, "get");
    mockPost = vi.spyOn(chatService.axios, "post");
    mockPut = vi.spyOn(chatService.axios, "put");
    mockDelete = vi.spyOn(chatService.axios, "delete");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get user chats", async () => {
    const mockResponse = { data: ["chat1", "chat2"] };
    mockGet.mockResolvedValue(mockResponse);

    const result = await chatService.getUserChats();

    expect(mockGet).toHaveBeenCalledWith("/chat/getchat");
    expect(result).toEqual(mockResponse);
  });

  it("should delete chat", async () => {
    const chatId = "123";
    const mockResponse = { data: "chat deleted" };
    mockDelete.mockResolvedValue(mockResponse);

    const result = await chatService.deleteChat(chatId);

    expect(mockDelete).toHaveBeenCalledWith(`/chat/${chatId}`, {});
    expect(result).toEqual(mockResponse);
  });

  it("should edit chat", async () => {
    const chatId = "123";
    const formData = { title: "Updated Chat" };
    const mockResponse = { data: "chat updated" };
    mockPut.mockResolvedValue(mockResponse);

    const result = await chatService.editChat(chatId, formData);

    expect(mockPut).toHaveBeenCalledWith(`/chat/edit/${chatId}`, formData);
    expect(result).toEqual(mockResponse);
  });

  it("should handle chat completion", async () => {
    const chatId = "123";
    const formData = { message: "Hello" };
    const mockResponse = { data: "completion response" };
    mockPost.mockResolvedValue(mockResponse);

    const result = await chatService.chatCompletion(formData, chatId);

    expect(mockPost).toHaveBeenCalledWith(
      `/chat/completion/${chatId}`,
      formData
    );
    expect(result).toEqual(mockResponse);
  });

  it("should handle chat completion without chatId", async () => {
    const formData = { message: "Hello" };
    const mockResponse = { data: "completion response" };
    mockPost.mockResolvedValue(mockResponse);

    const result = await chatService.chatCompletion(formData);

    expect(mockPost).toHaveBeenCalledWith(
      `/chat/completion/undefined`,
      formData
    );
    expect(result).toEqual(mockResponse);
  });

  it("should delete message", async () => {
    const chatId = "123";
    const mockResponse = { data: "message deleted" };
    mockDelete.mockResolvedValue(mockResponse);

    const result = await chatService.deleteMessage(chatId);

    expect(mockDelete).toHaveBeenCalledWith(`/messages/${chatId}`, {});
    expect(result).toEqual(mockResponse);
  });

  it("should get messages", async () => {
    const chatId = "123";
    const mockResponse = { data: ["message1", "message2"] };
    mockGet.mockResolvedValue(mockResponse);

    const result = await chatService.getMessages(chatId);

    expect(mockGet).toHaveBeenCalledWith(`/messages/${chatId}`);
    expect(result).toEqual(mockResponse);
  });
});

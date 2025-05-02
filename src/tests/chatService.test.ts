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
            initializeInterceptors: vi.fn(),
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

        const result: any = await chatService.getUserChats();

        expect(AxiosClass.get).toHaveBeenCalledWith("/chat/getchat");
        expect(result).toEqual(mockChats);
        expect(result.error).toBeUndefined();
    });

    it("should get user chats (error)", async () => {
        (AxiosClass.get as any).mockResolvedValueOnce({
            status: "error",
            message: "Some error",
            errorCode: "ERR",
        });

        expect(async () => await chatService.getUserChats()).rejects.toThrow();
    });

    it("should delete chat (success)", async () => {
        (AxiosClass.delete as any).mockResolvedValueOnce({
            status: "success",
        });

        const result: any = await chatService.deleteChat("123");

        expect(AxiosClass.delete).toHaveBeenCalledWith("/chat/123");
        expect(result?.data).toBeUndefined();
        expect(result?.error).toBeUndefined();
    });

    it("should delete chat (error)", async () => {
        (AxiosClass.delete as any).mockResolvedValueOnce({
            status: "error",
            message: "Delete failed",
            errorCode: "ERR",
        });

        expect(
            async () => await chatService.deleteChat("123")
        ).rejects.toThrow();
    });

    it("should edit chat (success)", async () => {
        (AxiosClass.put as any).mockResolvedValueOnce({
            status: "success",
        });

        const result: any = await chatService.editChat("123", {
            title: "Updated Chat",
        });

        expect(AxiosClass.put).toHaveBeenCalledWith("/chat/edit/123", {
            title: "Updated Chat",
        });
        expect(result?.data).toBeUndefined();
        expect(result?.error).toBeUndefined();
    });

    it("should edit chat (error)", async () => {
        (AxiosClass.put as any).mockResolvedValueOnce({
            status: "error",
            message: "Edit failed",
            errorCode: "ERR",
        });

        expect(
            async () =>
                await chatService.editChat("123", { title: "Updated Chat" })
        ).rejects.toThrow();
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

        const result: any = await chatService.chatCompletion(
            { prompt: "Hi" },
            "c1"
        );

        expect(AxiosClass.post).toHaveBeenCalledWith("/chat/completion", {
            prompt: "Hi",
            chatId: "c1",
        });
        expect(result).toEqual(mockResponse);
        expect(result.error).toBeUndefined();
    });

    it("should handle chat completion (error)", async () => {
        (AxiosClass.post as any).mockResolvedValueOnce({
            status: "error",
            message: "Completion failed",
            errorCode: "ERR",
        });

        expect(
            async () => await chatService.chatCompletion({ prompt: "H1" }, "c1")
        ).rejects.toThrow();
    });

    it("should handle chat completion without chatId", async () => {
        const mockResponse = {
            _id: "1",
            isFromUser: false,
            message: "Hello",
            chatId: undefined,
        };
        (AxiosClass.post as any).mockResolvedValueOnce({
            status: "success",
            response: mockResponse,
        });

        const result: any = await chatService.chatCompletion(
            { prompt: "Hi" },
            undefined
        );

        expect(AxiosClass.post).toHaveBeenCalledWith("/chat/completion", {
            prompt: "Hi",
            chatId: undefined,
        });
        expect(result).toEqual(mockResponse);
        expect(result.error).toBeUndefined();
    });

    it("should delete message (success)", async () => {
        (AxiosClass.delete as any).mockResolvedValueOnce({
            status: "success",
        });

        const result: any = await chatService.deleteMessage("msg1");

        expect(AxiosClass.delete).toHaveBeenCalledWith("/message/msg1");
        expect(result).toBeUndefined();
        expect(result).toBeUndefined();
    });

    it("should delete message (error)", async () => {
        (AxiosClass.delete as any).mockResolvedValueOnce({
            status: "error",
            message: "Delete message failed",
            errorCode: "ERR",
        });

        expect(
            async () => await chatService.deleteMessage("msg1")
        ).rejects.toThrow();
    });

    it("should get messages (success)", async () => {
        const mockMessages = [
            { _id: "1", isFromUser: true, message: "Hi", chatId: "c1" },
        ];
        (AxiosClass.get as any).mockResolvedValueOnce({
            status: "success",
            messages: mockMessages,
        });

        const result: any = await chatService.getMessages("c1");

        expect(AxiosClass.get).toHaveBeenCalledWith("/message/c1");
        expect(result).toEqual(mockMessages);
        expect(result.error).toBeUndefined();
    });

    it("should get messages (error)", async () => {
        (AxiosClass.get as any).mockResolvedValueOnce({
            status: "error",
            message: "Failed",
            errorCode: "ERR",
        });

        expect(
            async () => await chatService.getMessages("c1")
        ).rejects.toThrow();
    });
});

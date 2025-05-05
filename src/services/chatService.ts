/**
 * @file chatService.ts
 * @author Jaseem
 * @brief Service for handling chat-related API communications.
 * @version 1.0.0
 * @date 2025-04-24
 *
 * @details This file contains the ChatService class, which provides methods
 * for interacting with chat-related APIs, including fetching, editing, and
 * deleting chats and messages.
 *
 * @copyright Copyright (c) 2025 EchoMind
 */

import {
    AxiosChatResponse,
    AxiosErrorRespnse,
    ChatFormData,
} from "@/types/chat.types";
import {
    chat_Completion,
    delete_Chat,
    delete_Message,
    edit_Title,
    get_Messages,
    get_User_Chats,
} from "../constance/apiConstance";
import AxiosClass from "../utils/axios";

AxiosClass.initializeInterceptors();

/**
 * @class ChatService
 * @brief Provides methods for interacting with chat-related APIs.
 */
class ChatService {
    /**
     * @brief Fetches the list of user chats.
     * @return A promise resolving to a ServiceResponse containing the list of chats.
     */
    async getUserChats() {
        const response = (await AxiosClass.get(get_User_Chats)) as
            | AxiosErrorRespnse
            | AxiosChatResponse;

        if ("status" in response && response.status === "error") {
            throw new Error((response as AxiosErrorRespnse).message);
        }
        // TypeScript now knows response is AxiosChatResponse
        return (response as AxiosChatResponse).chats;
    }

    /**
     * @brief Deletes a chat by its ID.
     * @param chatId The ID of the chat to delete.
     * @return A promise resolving to a ServiceResponse indicating success or failure.
     */
    async deleteChat(chatId: string) {
        const response = (await AxiosClass.delete(
            `${delete_Chat}/${chatId}`
        )) as AxiosErrorRespnse;

        if ("status" in response && response.status === "error") {
            throw new Error((response as AxiosErrorRespnse).message);
        }
        return undefined;
    }

    /**
     * @brief Edits a chat's details.
     * @param chatId The ID of the chat to edit.
     * @param formData The form data containing the updated chat details.
     * @return A promise resolving to a ServiceResponse indicating success or failure.
     */
    async editChat(chatId: string, formData: ChatFormData) {
        const response = (await AxiosClass.put(
            `${edit_Title}/${chatId}`,
            formData
        )) as AxiosChatResponse | AxiosErrorRespnse;

        if ("status" in response && response.status === "error") {
            throw new Error((response as AxiosErrorRespnse).message);
        }
        return undefined;
    }

    /**
     * @brief Completes a chat by generating a response.
     * @param formData The form data containing the prompt for the chat.
     * @param chatId (Optional) The ID of the chat to complete.
     * @return A promise resolving to a ServiceResponse containing the generated response.
     */
    async chatCompletion(formData: ChatFormData, chatId?: string) {
        const response = (await AxiosClass.post(`${chat_Completion}`, {
            ...formData,
            chatId,
        })) as AxiosErrorRespnse | AxiosChatResponse;

        if ("status" in response && response.status === "error") {
            throw new Error((response as AxiosErrorRespnse).message);
        }
        return (response as AxiosChatResponse).response;
    }

    /**
     * @brief Deletes a message by its ID.
     * @param chatId The ID of the message to delete.
     * @return A promise resolving to a ServiceResponse indicating success or failure.
     */
    async deleteMessage(chatId: string) {
        const response = (await AxiosClass.delete(
            `${delete_Message}/${chatId}`
        )) as AxiosErrorRespnse;
        if ("status" in response && response.status === "error") {
            throw new Error((response as AxiosErrorRespnse).message);
        }
        return undefined;
    }

    /**
     * @brief Fetches the messages for a specific chat.
     * @param chatId The ID of the chat whose messages are to be fetched.
     * @return A promise resolving to a ServiceResponse containing the list of messages.
     */
    async getMessages(chatId?: string) {
        const response = (await AxiosClass.get(`${get_Messages}/${chatId}`)) as
            | AxiosChatResponse
            | AxiosErrorRespnse;

        if ("status" in response && response.status === "error") {
            throw new Error((response as AxiosErrorRespnse).message);
        }

        const messagesArray = (response as AxiosChatResponse).messages;
        return messagesArray;
    }
}

export default ChatService;

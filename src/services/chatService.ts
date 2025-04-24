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

import { AxiosClass } from "../tests/mockfile";

/**
 * @interface AxiosResponse
 * @brief Represents a generic API response.
 */
interface AxiosResponse {
  status: string;
}

/**
 * @interface AxiosErrorRespnse
 * @brief Represents an error response from the API.
 */
interface AxiosErrorRespnse extends AxiosResponse {
  errorCode: string;
  message: string;
}

/**
 * @interface AxiosUserResponse
 * @brief Represents a user-related API response.
 */
export interface AxiosUserResponse extends AxiosResponse {
  user: {
    username: string;
    email: string;
  };
  token: string;
}

/**
 * @interface AxiosChatResponse
 * @brief Represents a chat-related API response.
 */
interface AxiosChatResponse extends AxiosResponse {
  response?: {
    _id: string;
    isFromUser: boolean;
    message: string;
    chatId: string;
  };
  chats?: {
    title: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  }[];
  messages?: {
    _id: string;
    isFromUser: boolean;
    message: string;
    chatId: string;
  }[];
}

/**
 * @interface ServiceResponse
 * @brief Represents a generic service response.
 * @tparam T The type of data returned by the service.
 */
interface ServiceResponse<T> {
  data?: T;
  error?: string;
}

/**
 * @interface ChatFormData
 * @brief Represents the form data for chat-related operations.
 */
interface ChatFormData {
  title?: string;
  prompt?: string;
}

/**
 * @class ChatService
 * @brief Provides methods for interacting with chat-related APIs.
 */
class ChatService {
  private axios = new AxiosClass();

  /**
   * @brief Fetches the list of user chats.
   * @return A promise resolving to a ServiceResponse containing the list of chats.
   */
  async getUserChats(): Promise<ServiceResponse<AxiosChatResponse["chats"]>> {
    try {
      const response: AxiosErrorRespnse | AxiosChatResponse =
        await this.axios.get("/chat/getchat");

      if (response.status === "error") {
        return { error: response.message };
      }
      return { data: response.chats };
    } catch (error) {
      return { error: "Failed to fetch chats" };
    }
  }

  /**
   * @brief Deletes a chat by its ID.
   * @param chatId The ID of the chat to delete.
   * @return A promise resolving to a ServiceResponse indicating success or failure.
   */
  async deleteChat(chatId: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.axios.delete(`/chat/${chatId}`, {});

      if (response.status === "error") {
        return { error: response.message };
      }
      return { data: undefined };
    } catch (error) {
      return { error: "Failed to delete chat" };
    }
  }

  /**
   * @brief Edits a chat's details.
   * @param chatId The ID of the chat to edit.
   * @param formData The form data containing the updated chat details.
   * @return A promise resolving to a ServiceResponse indicating success or failure.
   */
  async editChat(
    chatId: string,
    formData: ChatFormData
  ): Promise<ServiceResponse<void>> {
    try {
      const response = await this.axios.put(`/chat/edit/${chatId}`, formData);

      if (response.status === "error") {
        return { error: response.message };
      }
      return { data: undefined };
    } catch (error) {
      return { error: "Failed to edit chat" };
    }
  }

  /**
   * @brief Completes a chat by generating a response.
   * @param formData The form data containing the prompt for the chat.
   * @param chatId (Optional) The ID of the chat to complete.
   * @return A promise resolving to a ServiceResponse containing the generated response.
   */
  async chatCompletion(
    formData: ChatFormData,
    chatId?: string
  ): Promise<ServiceResponse<AxiosChatResponse["response"]>> {
    try {
      const response: AxiosErrorRespnse | AxiosChatResponse =
        await this.axios.post(`/chat/completion/${chatId}`, formData);

      if (response.status === "error") {
        return { error: response.message };
      }
      return { data: response.response };
    } catch (error) {
      return { error: "Failed to complete chat" };
    }
  }

  /**
   * @brief Deletes a message by its ID.
   * @param chatId The ID of the message to delete.
   * @return A promise resolving to a ServiceResponse indicating success or failure.
   */
  async deleteMessage(chatId: string): Promise<ServiceResponse<void>> {
    try {
      const response: AxiosErrorRespnse = await this.axios.delete(
        `/messages/${chatId}`,
        {}
      );
      if (response.status === "error") {
        return { error: response.message };
      }
      return { data: undefined };
    } catch (error) {
      return { error: "Failed to delete message" };
    }
  }

  /**
   * @brief Fetches the messages for a specific chat.
   * @param chatId The ID of the chat whose messages are to be fetched.
   * @return A promise resolving to a ServiceResponse containing the list of messages.
   */
  async getMessages(
    chatId: string
  ): Promise<ServiceResponse<AxiosChatResponse["messages"]>> {
    try {
      const response: AxiosChatResponse | AxiosErrorRespnse =
        await this.axios.get(`/messages/${chatId}`);
      if (response.status === "error") {
        return { error: response.message };
      }

      return { data: response.messages };
    } catch (error) {
      return { error: "Failed to fetch messages" };
    }
  }
}

export default ChatService;

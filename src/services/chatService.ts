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

import AxiosClass from "../utils/axios";

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
    messages?: {
      _id: string;
      isFromUser: boolean;
      message: string;
      chatId: string;
    }[];
  };
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
  /**
   * @brief Fetches the list of user chats.
   * @return A promise resolving to a ServiceResponse containing the list of chats.
   */
  async getUserChats(): Promise<ServiceResponse<AxiosChatResponse["chats"]>> {
    try {
      const response = (await AxiosClass.get("/chat/getChat")) as
        | AxiosErrorRespnse
        | AxiosChatResponse;

      if (response.status === "error") {
        return { error: (response as AxiosErrorRespnse).message };
      }
      // TypeScript now knows response is AxiosChatResponse
      return { data: (response as AxiosChatResponse).chats };
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
      const response = (await AxiosClass.delete(
        `/chat/${chatId}`
      )) as AxiosErrorRespnse;

      if (response.status === "error") {
        return { error: (response as AxiosErrorRespnse).message };
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
      const response = (await AxiosClass.put(
        `/chat/edit/${chatId}`,
        formData
      )) as AxiosChatResponse | AxiosErrorRespnse;

      if (response.status === "error") {
        return { error: (response as AxiosErrorRespnse).message };
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
      const response = (await AxiosClass.post(
        `/chat/completion/${chatId}`,
        formData
      )) as AxiosErrorRespnse | AxiosChatResponse;

      if (response.status === "error") {
        return { error: (response as AxiosErrorRespnse).message };
      }
      return { data: (response as AxiosChatResponse).response };
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
      const response = (await AxiosClass.delete(
        `/messages/${chatId}`
      )) as AxiosErrorRespnse;
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
  async getMessages(chatId?: string) {
    try {
      const response = (await AxiosClass.get(`/message/${chatId}`)) as
        | AxiosChatResponse
        | AxiosErrorRespnse;
      if (response.status === "error") {
        return { error: (response as AxiosErrorRespnse).message };
      }
      const messagesArray = (response as AxiosChatResponse).messages;
      if (!messagesArray?.messages) {
        return { error: "Failed to fetch messages" };
      }
      const messge = messagesArray.messages;
      return { data: messge };
    } catch (error) {
      return { error: "Failed to fetch messages" };
    }
  }
}

export default ChatService;

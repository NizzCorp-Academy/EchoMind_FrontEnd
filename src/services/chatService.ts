/**
 * @file chatService.ts
 * @author Jaseem
 * @date 2025-04-24
 * @brief Service for handling chat-related API communications
 * @version 1.0.0
 *
 * @copyright Copyright (c) 2025 EchoMind
 *
 * @details This file contains the ChatService class which handles all chat-related
 * API communications including fetching, deleting, and editing chats and messages.
 */

import { AxiosClass } from "../tests/mockfile";

/**
 * @interface AxiosResponse
 * @since 1.0.0
 * @brief Interface defining the structure of API responses
 */
interface AxiosResponse {
  /** @brief The status of the response */
  status: string;
  /** @brief Array of messages or null */
  message: string[] | null;
  /** @brief Array of chat data or null */
  chats: string[] | null;
  /** @brief Response string or null */
  response: string | null;
}

/**
 * @class ChatService
 * @brief Service class for managing chat operations
 * @since 1.0.0
 *
 * @details
 * This class provides methods for interacting with the chat API endpoints.
 * It handles operations such as fetching chats, sending messages, and managing chat history.
 *
 * @note All methods return promises that resolve to AxiosResponse
 *
 * @par Usage Example:
 * @code
 * const chatService = new ChatService();
 * const chats = await chatService.getUserChats();
 * @endcode
 */
class ChatService {
  /**
   * @var axios
   * @brief Axios instance for making HTTP requests
   * @private
   */
  axios = new AxiosClass();

  /**
   * @fn async getUserChats()
   * @brief Fetches all chats for the current user
   * @return {Promise<AxiosResponse>} Promise containing chat data
   * @throws {Error} When the API request fails
   */
  async getUserChats() {
    const response = await this.axios.get("/chat/getchat");
    return response;
  }

  /**
   * @fn async deleteChat(chatId: string)
   * @brief Deletes a specific chat
   * @param chatId The ID of the chat to delete
   * @return {Promise<AxiosResponse>} Promise containing deletion result
   * @throws {Error} When the deletion fails
   */
  async deleteChat(chatId: string) {
    const response = await this.axios.delete(`/chat/${chatId}`, {});
    return response;
  }

  /**
   * @fn async editChat(chatId: string, formData: {})
   * @brief Edits a specific chat's details
   * @param chatId The ID of the chat to edit
   * @param formData The updated chat data
   * @return {Promise<AxiosResponse>} Promise containing update result
   * @throws {Error} When the edit operation fails
   */
  async editChat(chatId: string, formData: {}) {
    const response = await this.axios.put(`/chat/edit/${chatId}`, formData);
    return response;
  }

  /**
   * @fn async chatCompletion(formData: {}, chatId?: string)
   * @brief Sends a chat completion request
   * @param formData The chat completion data
   * @param chatId Optional chat ID for existing conversations
   * @return {Promise<AxiosResponse>} Promise containing completion response
   * @throws {Error} When the completion request fails
   */
  async chatCompletion(formData: {}, chatId?: string) {
    const response = await this.axios.post(
      `/chat/completion/${chatId}`,
      formData
    );
    return response;
  }

  /**
   * @fn async deleteMessage(messageId: string)
   * @brief Deletes a specific message
   * @param messageId The ID of the message to delete
   * @return {Promise<AxiosResponse>} Promise containing deletion result
   * @throws {Error} When the message deletion fails
   */
  async deleteMessage(messageId: string) {
    const response = await this.axios.delete(`/messages/${messageId}`, {});
    return response;
  }

  /**
   * @fn async getMessages(chatId: string)
   * @brief Fetches all messages for a specific chat
   * @param chatId The ID of the chat to fetch messages from
   * @return {Promise<AxiosResponse>} Promise containing messages data
   * @throws {Error} When the message retrieval fails
   */
  async getMessages(chatId: string) {
    const response = await this.axios.get(`/messages/${chatId}`);
    return response;
  }
}

export default ChatService;

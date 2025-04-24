import { AxiosClass } from "../tests/mockfile";

interface AxiosResponse {
  status: string;
}

interface AxiosErrorRespnse extends AxiosResponse {
  errorCode: string;
  message: string;
}

export interface AxiosUserResponse extends AxiosResponse {
  user: {
    username: string;
    email: string;
  };
  token: string;
}

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

interface ServiceResponse<T> {
  data?: T;
  error?: string;
}

interface ChatFormData {
  title?: string;
  prompt?: string;
}

class ChatService {
  private axios = new AxiosClass();

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

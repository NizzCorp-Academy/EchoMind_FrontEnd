import { AxiosClass } from "../tests/mockfile";

class ChatService {
  axios = new AxiosClass();
  async getUserChats() {
    const response = await this.axios.get("/chat/getchat");
    return response;
  }
  async deleteChat(chatId: string) {
    const response = await this.axios.delete(`/chat/${chatId}`, {});
    return response;
  }
  async editChat(chatId: string, formData: {}) {
    const response = await this.axios.put(`/chat/edit/${chatId}`, formData);
    return response;
  }
  async chatCompletion(formData: {}, chatId?: string) {
    const response = await this.axios.post(
      `/chat/completion/${chatId}`,
      formData
    );
    return response;
  }
  async deleteMessage(chatId: string) {
    const response = await this.axios.delete(`/messages/${chatId}`, {});
    return response;
  }
  async getMessages(chatId: string) {
    const response = await this.axios.get(`/messages/${chatId}`);
    return response;
  }
}

export default ChatService;

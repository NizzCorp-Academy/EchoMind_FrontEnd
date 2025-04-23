import { AxiosClass } from "../tests/mockfile";

class ChatService {
  axios = new AxiosClass();
  async getUserChats() {
    const response = await this.axios.get("/chat/getchat", {});
    return response;
  }
  async deleteChat(formData: {}) {
    const response = await this.axios.delete("/chat/delete", formData);
    return response;
  }
  async editChat(formData: {}) {
    const response = await this.axios.delete("/chat/delete", formData);
    return response;
  }
  async chatCompletion(formData: {}) {
    const response = await this.axios.delete("/chat/completion", formData);
    return response;
  }
  async deleteMessage(formData: {}) {
    const response = await this.axios.delete("/messages/delete", formData);
    return response;
  }
  async getMessages(data: {}) {
    const response = await this.axios.get("/messages/getall", data);
    return response;
  }
}

export default ChatService;

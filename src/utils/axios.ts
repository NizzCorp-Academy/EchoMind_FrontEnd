import axios, { AxiosInstance } from "axios";
class AxiosClass {
  private static api: AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
  });
  static async get(endPoint: string) {
    const response = await this.api.get(endPoint);
    return response.data;
  }
  static async post(endPoint: string, data: {}) {
    const response = await this.api.post(endPoint, data);
    return response.data;
  }
  static async put(endPoint: string, data: {}) {
    const response = await this.api.put(endPoint, data);
    return response.data;
  }
  static async delete(endPoint: string) {
    const response = await this.api.delete(`${endPoint}`);
    return response.data;
  }
}
export default AxiosClass;

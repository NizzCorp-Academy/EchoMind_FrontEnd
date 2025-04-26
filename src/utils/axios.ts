import axios from "axios";
import { base_Url } from "../constance/apiConstance";

/**
 * @class AxiosClass
 * @brief A wrapper class around Axios for simplified HTTP requests.
 *
 * This class provides static methods to perform GET, POST, PUT, and DELETE requests.
 * It uses a preconfigured Axios instance with a base URL and credentials support.
 *
 * @author Muhammad Haseen
 * @date 23/04/2025
 */
class AxiosClass {
  /** @private @static Axios instance configured with base URL and credentials */
  private static api: Axios.AxiosInstance = axios.create({
    baseURL:base_Url,
    withCredentials: true,
  });

  /**
   * @brief Sends a GET request to the specified endpoint.
   * @param endPoint The API endpoint to send the GET request to.
   * @returns The response data from the server.
   */
  static async get(endPoint: string) {
    const response = await this.api.get(endPoint);
    return response.data;
  }

  /**
   * @brief Sends a POST request with data to the specified endpoint.
   * @param endPoint The API endpoint to send the POST request to.
   * @param data The payload to send with the request.
   * @returns The response data from the server.
   */
  static async post(endPoint: string, data: {}) {
    const response = await this.api.post(endPoint, data);
    return response.data;
  }

  /**
   * @brief Sends a PUT request with data to the specified endpoint.
   * @param endPoint The API endpoint to send the PUT request to.
   * @param data The payload to update with the request.
   * @returns The response data from the server.
   */
  static async put(endPoint: string, data: {}) {
    const response = await this.api.put(endPoint, data);
    return response.data;
  }

  /**
   * @brief Sends a DELETE request to the specified endpoint.
   * @param endPoint The API endpoint to send the DELETE request to.
   * @returns The response data from the server.
   */
  static async delete(endPoint: string) {
    const response = await this.api.delete(`${endPoint}`);
    return response.data;
  }
}

export default AxiosClass;

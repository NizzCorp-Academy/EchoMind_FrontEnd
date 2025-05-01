import axios, { AxiosInstance } from "axios";
import { base_Url } from "../constance/apiConstance";
import { toast } from "sonner";

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
    private static api: AxiosInstance = axios.create({
        baseURL: base_Url,
        withCredentials: true,
    });

    public static initializeInterceptors() {
        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    toast(error.response.data.message);
                    console.error(
                        "Global error handler:",
                        error.response.status,
                        error.response.data
                    );
                } else {
                    console.error("No response received:", error.message);
                }

                return Promise.reject(error);
            }
        );
    }

    /**
     * @brief Sends a GET request to the specified endpoint.
     * @param endPoint The API endpoint to send the GET request to.
     * @returns The response data from the server.
     */
    static async get<T>(endPoint: string): Promise<T> {
        const response = await this.api.get<T>(endPoint);
        return response.data;
    }

    /**
     * @brief Sends a POST request with data to the specified endpoint.
     * @param endPoint The API endpoint to send the POST request to.
     * @param data The payload to send with the request.
     * @returns The response data from the server.
     */
    static async post<T>(endPoint: string, data: {}): Promise<T> {
        const response = await this.api.post<T>(endPoint, data);
        return response.data;
    }

    /**
     * @brief Sends a PUT request with data to the specified endpoint.
     * @param endPoint The API endpoint to send the PUT request to.
     * @param data The payload to update with the request.
     * @returns The response data from the server.
     */
    static async put<T>(endPoint: string, data: {}): Promise<T> {
        const response = await this.api.put<T>(endPoint, data);
        return response.data;
    }

    /**
     * @brief Sends a DELETE request to the specified endpoint.
     * @param endPoint The API endpoint to send the DELETE request to.
     * @returns The response data from the server.
     */
    static async delete<T>(endPoint: string): Promise<T> {
        const response = await this.api.delete<T>(`${endPoint}`);
        return response.data;
    }
}

export default AxiosClass;

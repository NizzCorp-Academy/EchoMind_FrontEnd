/**
 * @file userService.ts
 * @author Muhammad Haseen
 * @date 2025-04-28
 * 
 * @brief
 * This file defines the `UserService` class that handles all user authentication-related API operations.
 * 
 * @details
 * - Provides methods for registering a user, logging in, fetching user data, and logging out.
 * - Utilizes a custom Axios instance for making HTTP requests.
 * - Manages authentication tokens using browser cookies via the `js-cookie` library.
 * - Standardizes API responses with a `ServiceResponse` generic type.
 * 
 * @module UserService
 */

import AxiosClass from "../utils/axios";
import { login_User, register_User, get_User } from "../constance/apiConstance";
import Cookies from "js-cookie";

/**
 * @interface AxiosErrorResponse
 * @brief Represents the structure of an error response from Axios.
 */
interface AxiosErrorResponse {
  status: string;
  errorCode: string;
  message: string;
  error: string;
}

/**
 * @interface AxiosUserResponse
 * @brief Represents the structure of a successful user response from Axios.
 */
interface AxiosUserResponse {
  status: string;
  user: {
    username: string;
    email: string;
  };
  token: string;
}

/**
 * @interface User
 * @brief Represents a user object.
 */
interface User {
  username: string;
  email: string;
}

/**
 * @interface ServiceResponse
 * @brief Generic service response structure.
 */
interface ServiceResponse<T> {
  data?: T;
  error?: string;
}

/**
 * @class UserService
 * @brief Service class for handling user-related API interactions.
 */
class UserService {
  /**
   * @brief Registers a new user.
   * @param data - Object containing username, email, and password.
   * @returns A Promise resolving to a ServiceResponse containing a User object or an error message.
   */
  async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<ServiceResponse<User>> {
    try {
      const response = await AxiosClass.post<AxiosUserResponse>(
        register_User,
        data
      );

      if (response.status === "error") {
        return { error: (response as unknown as AxiosErrorResponse).message };
      }
      Cookies.set("token", response.token);
      return {
        data: {
          username: response.user.username,
          email: response.user.email,
        },
      };
    } catch (error: any) {
      const err = error as { response?: { data?: { message?: string } } };
      return { error: err.response?.data?.message || "Registration failed" };
    }
  }

  /**
   * @brief Logs in an existing user.
   * @param data - Object containing email and password.
   * @returns A Promise resolving to a ServiceResponse containing a User object or an error message.
   */
  async login(data: {
    email: string;
    password: string;
  }): Promise<ServiceResponse<User>> {
    try {
      const response = await AxiosClass.post<AxiosUserResponse>(
        login_User,
        data
      );
      Cookies.set("token", response.token);
      if (response.status === "error") {
        return { error: (response as unknown as AxiosErrorResponse).message };
      }

      return {
        data: {
          username: response.user.username,
          email: response.user.email,
        },
      };
    } catch (error: any) {
      const err = error as { response?: { data?: { message?: string } } };
      return { error: err.response?.data?.message || "Login failed" };
    }
  }

  /**
   * @brief Fetches the currently authenticated user's data.
   * @returns A Promise resolving to a ServiceResponse containing a User object or an error message.
   */
  async getUser(): Promise<ServiceResponse<User>> {
    try {
      const response = await AxiosClass.get<AxiosUserResponse>(get_User);

      if (response.status === "error") {
        return { error: (response as unknown as AxiosErrorResponse).message };
      }

      return {
        data: {
          username: response.user.username,
          email: response.user.email,
        },
      };
    } catch (error: any) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        error:
          err.response?.data?.message ||
          "User details can't be retrieved at the moment.",
      };
    }
  }

  /**
   * @brief Logs out the current user by removing the authentication token.
   * @returns An optional error message if logout fails.
   */
   logOut() {
    try {
      Cookies.remove("token");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        error: err.response?.data?.message || "LogOut failed",
      };
    }
  }
}

export default UserService;

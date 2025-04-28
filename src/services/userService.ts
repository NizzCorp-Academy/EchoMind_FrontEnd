import AxiosClass from "../utils/axios";
import { login_User, register_User, get_User } from "../constance/apiConstance";
import Cookies from "js-cookie";

interface AxiosErrorResponse {
  status: string;
  errorCode: string;
  message: string;
  error: string;
}

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

class UserService {
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

      Cookies.set("token", response.token);
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
}

export default UserService;

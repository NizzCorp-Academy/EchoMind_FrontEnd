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
import {
    AxiosErrorResponse,
    ServiceResponse,
    ServiceUser,
} from "@/types/user.types";
import { AxiosUserResponse } from "@/types/chat.types";

AxiosClass.initializeInterceptors();

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
    }): Promise<ServiceResponse<ServiceUser>> {
        const response = await AxiosClass.post<AxiosUserResponse>(
            register_User,
            data
        );

        if (response.status === "error") {
            throw new Error(
                (response as unknown as AxiosErrorResponse).message
            );
        }
        Cookies.set("jwt", response.token, { expires: 15 });
        return {
            data: {
                username: response.user.username,
                email: response.user.email,
            },
        };
    }

    /**
     * @brief Logs in an existing user.
     * @param data - Object containing email and password.
     * @returns A Promise resolving to a ServiceResponse containing a User object or an error message.
     */
    async login(data: {
        email: string;
        password: string;
    }): Promise<ServiceResponse<ServiceUser>> {
        const response = await AxiosClass.post<AxiosUserResponse>(
            login_User,
            data
        );
        Cookies.set("jwt", response.token, { expires: 15 });
        if (response.status === "error") {
            throw new Error(
                (response as unknown as AxiosErrorResponse).message
            );
        }

        return {
            data: {
                username: response.user.username,
                email: response.user.email,
            },
        };
    }

    /**
     * @brief Fetches the currently authenticated user's data.
     * @returns A Promise resolving to a ServiceResponse containing a User object or an error message.
     */
    async getUser(): Promise<ServiceResponse<ServiceUser>> {
        const response = await AxiosClass.get<AxiosUserResponse>(get_User);
        console.log("From Service", response);

        if (response.status === "error") {
            throw new Error(
                (response as unknown as AxiosErrorResponse).message
            );
        }
        return {
            data: {
                username: response.user.username,
                email: response.user.email,
            },
        };
    }

    /**
     * @brief Logs out the current user by removing the authentication token.
     * @returns An optional error message if logout fails.
     */
    logOut() {
        Cookies.remove("jwt");
    }
}

export default UserService;

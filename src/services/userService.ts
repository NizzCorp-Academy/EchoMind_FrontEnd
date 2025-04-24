/**
 * @file userService.ts
 * @author Jaseem
 * @date 2025-04-24
 * @brief Service for handling user authentication and management
 * @version 1.0.0
 *
 * @copyright Copyright (c) 2025 EchoMind
 *
 * @details This file contains the UserService class which handles all user-related
 * API communications including registration, login, and user profile management.
 */

import AxiosClass from "../utils/axios";


/**
 * @class UserService
 * @brief Service class for managing user operations
 * @since 1.0.0
 *
 * @details
 * This class provides methods for interacting with the user authentication API endpoints.
 * It handles operations such as user registration, login, and profile retrieval.
 *
 * @note All methods return promises that resolve to API responses
 *
 * @par Usage Example:
 * @code
 * const userService = new UserService();
 * await userService.login({ username: "user", password: "pass" });
 * @endcode
 */
class UserService {


  /**
   * @fn async register(data: {})
   * @brief Registers a new user
   * @param data Object containing user registration details
   * @return {Promise<any>} Promise containing registration response
   * @throws {Error} When registration fails
   */
  async register(data: {}) {
    const response = await AxiosClass.post("/auth/register", data);
    return response;
  }

  /**
   * @fn async login(data: {})
   * @brief Authenticates a user
   * @param data Object containing login credentials
   * @return {Promise<any>} Promise containing login response
   * @throws {Error} When authentication fails
   */
  async login(data: {}) {
    const response = await AxiosClass.post("/auth/login", data);
    return response;
  }

  /**
   * @fn async getUser()
   * @brief Retrieves current user's profile
   * @return {Promise<any>} Promise containing user profile data
   * @throws {Error} When profile retrieval fails
   */
  async getUser() {
    const response = await AxiosClass.get("/auth/me");
    return response;
  }
}

export default UserService;
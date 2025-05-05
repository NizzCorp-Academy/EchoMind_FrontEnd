/**
 * @brief Redux slice for chat state.
 */
export interface ChatState {
    error: any;
    chats:
        | { _id: string; title: string; createdAt: string; updatedAt: string }[]
        | undefined;
    isGettingChat: boolean;
    isUpdattingChat: boolean;
    isDelettingChat: boolean;
    isGettingMessage: boolean;
    isDelettingMessage: boolean;
    isGettingResponse: boolean;
    messages:
        | {
              isFromUser: boolean;
              _id: string;
              chatId: string;
              message: string;
          }[]
        | undefined;
}

/**
 * @interface AxiosResponse
 * @brief Represents a generic API response.
 */
export interface AxiosResponse {
    status: string;
}

/**
 * @interface AxiosErrorRespnse
 * @brief Represents an error response from the API.
 */
export interface AxiosErrorRespnse extends AxiosResponse {
    errorCode: string;
    message: string;
}

/**
 * @interface AxiosUserResponse
 * @brief Represents a user-related API response.
 */
export interface AxiosUserResponse extends AxiosResponse {
    user: {
        username: string;
        email: string;
    };
    token: string;
}

/**
 * @interface AxiosChatResponse
 * @brief Represents a chat-related API response.
 */
export interface AxiosChatResponse extends AxiosResponse {
    response?: {
        userMessage: {
            _id: string;
            isFromUser: boolean;
            message: string;
            chatId: string;
        };

        responseMessage: {
            _id: string;
            isFromUser: boolean;
            message: string;
            chatId: string;
        };
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

/**
 * @interface ChatFormData
 * @brief Represents the form data for chat-related operations.
 */
export interface ChatFormData {
    title?: string;
    prompt?: string;
}

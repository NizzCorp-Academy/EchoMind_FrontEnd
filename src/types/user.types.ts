/**
 * @interface User
 * @brief Represents a user object.
 */
export interface User {
    id?: string;
    username?: string;
    email?: string;
}

/**
 * @interface ServiceResponse
 * @brief Generic service response structure.
 */
export interface ServiceResponse<T> {
    data?: T;
    error?: string;
}

/**
 * @interface InitialState
 * @brief Initial state structure for the user slice.
 */
export interface InitialState {
    user: User | null;
    isLoggingUser: boolean;
    isRegisteringUser: boolean;
    isGettingUser: boolean;
    error: string | null;
}

/**
 * @interface AxiosErrorResponse
 * @brief Represents the structure of an error response from Axios.
 */
export interface AxiosErrorResponse {
    status: string;
    errorCode: string;
    message: string;
    error: string;
}

/**
 * @interface AxiosUserResponse
 * @brief Represents the structure of a successful user response from Axios.
 */
export interface AxiosUserResponse {
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
export interface ServiceUser {
    username: string;
    email: string;
}

/**
 * @interface ServiceResponse
 * @brief Generic service response structure.
 */
export interface ServiceResponse<T> {
    data?: T;
    error?: string;
}

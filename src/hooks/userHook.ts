/**
 * @file userHook.ts
 * @brief Contains the UserHook class with custom hooks for user authentication and retrieval.
 * @details This file provides reusable hooks for login, registration, user retrieval, and logout functionality.
 * @authors
 * - Jaseem
 * - Muhammad Haseen
 */

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
    gettingUserAsync,
    loginUserAsync,
    logout,
    registeringUserAsync,
} from "../features/user/userSlice";
import UserService from "@/services/userService";

/**
 * @class UserHook
 * @brief Provides custom hooks for user login and fetching user data.
 */
/**
 * @brief Custom hook for logging in a user.
 * @returns {object} An object containing the user, loginUser function, and isLoggingin status.
 *
 * @details
 * - user: The current user object from the Redux store.
 * - loginUser: Function to dispatch login action with email and password.
 * - isLogin: Boolean indicating if login is in progress.
 */
export const useLogin = () => {
    const { user, isLoggingUser } = useSelector(
        (state: RootState) => state.user
    );
    const dispatch = useDispatch<AppDispatch>();
    const loginUser = (email: string, password: string) => {
        dispatch(loginUserAsync({ email, password }));
    };
    return { user, loginUser, isLoggingUser };
};

/**
 * @brief Custom hook for register a user.
 * @returns {object} An object containing the user, registerUser function, and isRegister status.
 *
 * @details
 * - user: The current user object from the Redux store.
 * - registerUser: Function to dispatch register action with username and email and password.
 * - isRegisteringUser: Boolean indicating if register is in progress.
 */
export const useRegister = () => {
    const { user, isRegisteringUser } = useSelector(
        (state: RootState) => state.user
    );
    const dispatch = useDispatch<AppDispatch>();
    const registerUser = (
        username: string,
        email: string,
        password: string
    ) => {
        dispatch(registeringUserAsync({ username, email, password }));
    };
    return { user, registerUser, isRegisteringUser };
};

/**
 * @brief Custom hook for retrieving the logged-in user.
 * @returns {object} An object containing the user, getUSer function, and isGettingUser status.
 *
 * @details
 * - user: The current user object from the Redux store.
 * - getUSer: Function to dispatch action to get the logged-in user.
 * - isGettingUser: Boolean indicating if user retrieval is in progress.
 */
export const useGetUser = () => {
    const { user, isGettingUser } = useSelector(
        (state: RootState) => state.user
    );
    const dispatch = useDispatch<AppDispatch>();
    const getUser = () => {
        dispatch(gettingUserAsync());
    };

    return { user, getUser, isGettingUser };
};

/**
 * @brief Custom hook for logging out a user.
 * @returns {function} A function to remove the user's token and dispatch the logout action.
 *
 * @details
 * - Removes the user's token using the UserService.
 * - Dispatches the logout action to update the Redux store.
 */
export const useLogout = () => {
    const dispatch = useDispatch<AppDispatch>();

    /**
     * @brief Custom hook for register a user.
     * @returns {object} An object containing the user, registerUser function, and isRegister status.
     *
     * @details
     * - user: The current user object from the Redux store.
     * - registerUser: Function to dispatch register action with username and email and password.
     * - isRegisteringUser: Boolean indicating if register is in progress.
     */
    const removeToken = () => {
        const userService = new UserService();
        userService.logOut();
        dispatch(logout());
    };
    return { removeToken };
};

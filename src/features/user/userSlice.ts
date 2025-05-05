/**
 * @file userSlice.ts
 * @author Muhammad Haseen
 * @date 2025-04-28
 *
 * @brief
 * This file manages the user authentication state using Redux Toolkit's `createSlice` and `createAsyncThunk`.
 * It handles user registration, login, fetching the current user's data, and logout functionalities.
 *
 * @details
 * - Defines the structure of the user object and initial authentication state.
 * - Implements async thunks for API requests (register, login, get user).
 * - Uses a slice to manage authentication state transitions during pending, fulfilled, and rejected phases of thunks.
 * - Includes a logout reducer to clear user data from the store.
 *
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/userService";
import { InitialState, ServiceResponse, User } from "@/types/user.types";

/**
 * @var initialState
 * @brief The default state for the user slice.
 */
const initialState: InitialState = {
    user: null,
    isLoggingUser: false,
    isRegisteringUser: false,
    isGettingUser: false,
    error: null,
};

/**
 * @brief Async thunk for registering a new user.
 */
export const registeringUserAsync = createAsyncThunk<
    User,
    { username: string; email: string; password: string },
    { rejectValue: string }
>("user/register", async (data, { rejectWithValue }) => {
    const userService = new UserService();
    const response: ServiceResponse<User> = await userService.register(data);

    if (response.error) {
        return rejectWithValue(response.error);
    }
    return response.data as User;
});

/**
 * @brief Async thunk for logging in a user.
 */
export const loginUserAsync = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>("user/login", async (data, { rejectWithValue }) => {
    const userService = new UserService();
    const response: ServiceResponse<User> = await userService.login(data);

    if (response.error) {
        return rejectWithValue(response.error);
    }
    return response.data as User;
});

/**
 * @brief Async thunk for fetching the current user.
 */
export const gettingUserAsync = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>("user/getUser", async (_, { rejectWithValue }) => {
    const userService = new UserService();
    const response: ServiceResponse<User> = await userService.getUser();

    if (response.error) {
        return rejectWithValue(response.error);
    }
    return response.data as User;
});

/**
 * @brief Slice for managing user authentication state.
 *
 * @details
 * This slice handles user-related actions such as login, registration, fetching the current user, and logout.
 * It uses Redux Toolkit's `createSlice` and `createAsyncThunk` for managing asynchronous actions and state updates.
 */
export const userSlice = createSlice({
    name: "user",
    initialState,

    /**
     * @brief Reducers for synchronous actions.
     */
    reducers: {
        /**
         * @brief Logs out the user by clearing the user state.
         *
         * @details
         * This reducer sets the `user` state to `null`, effectively logging out the user.
         * It does not handle token removal, which should be managed separately.
         */
        logout: (state) => {
            state.user = null;
        },
    },

    /**
     * @brief Handles asynchronous actions for user-related operations.
     */
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registeringUserAsync.pending, (state) => {
                state.isRegisteringUser = true;
                state.error = null;
            })
            .addCase(registeringUserAsync.fulfilled, (state, action) => {
                state.isRegisteringUser = false;
                state.user = action.payload;
            })
            .addCase(registeringUserAsync.rejected, (state, action) => {
                state.isRegisteringUser = false;
                state.error = action.payload || "Registration failed";
            })
            // Login User
            .addCase(loginUserAsync.pending, (state) => {
                state.isLoggingUser = true;
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.isLoggingUser = false;
                state.user = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.isLoggingUser = false;
                state.error = action.payload || "Login failed";
            })
            // Get Current User
            .addCase(gettingUserAsync.pending, (state) => {
                state.isGettingUser = true;
                state.error = null;
            })
            .addCase(gettingUserAsync.fulfilled, (state, action) => {
                state.isGettingUser = false;
                state.user = action.payload;
            })
            .addCase(gettingUserAsync.rejected, (state, action) => {
                state.isGettingUser = false;
                state.error = action.payload || "Fetching user failed";
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

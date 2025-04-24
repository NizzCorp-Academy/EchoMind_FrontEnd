import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/userService";
/**
 * @author Muhammad Haseen
 * @date 24/04/2025
 * @file userSlice.ts
 */
/**
 * @interface User
 * @brief Represents a user object.
 */
interface User {
  id?: string;     /**< Unique identifier for the user */
  name?: string;   /**< Name of the user */
  email?: string;  /**< Email of the user */
}

/**
 * @interface InitialState
 * @brief Initial state structure for the user slice.
 */
export interface InitialState {
  user: User | null;                /**< Current authenticated user */
  isLoggingUser: boolean;          /**< Indicates if a login request is in progress */
  isRegisteringUser: boolean;      /**< Indicates if a registration request is in progress */
  isGettingUser: boolean;          /**< Indicates if user data fetch is in progress */
  error: string | null;            /**< Stores any error messages */
}

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
 * @brief Slice for managing user authentication state.
 */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registeringUserAsync.pending, (state) => {
        state.isRegisteringUser = true;
        state.error = null;
      })
      .addCase(registeringUserAsync.fulfilled, (state, action) => {
        state.isRegisteringUser = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registeringUserAsync.rejected, (state, action) => {
        state.isRegisteringUser = false;
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoggingUser = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoggingUser = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoggingUser = false;
        state.error = action.payload || "An unknown error occurred";
      })
      .addCase(gettingUserAsync.pending, (state) => {
        state.isGettingUser = true;
        state.error = null;
      })
      .addCase(gettingUserAsync.fulfilled, (state, action) => {
        state.isGettingUser = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(gettingUserAsync.rejected, (state, action) => {
        state.isGettingUser = false;
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

/**
 * @brief Async thunk for registering a new user.
 * 
 * @param data An object containing username, email, and password.
 * @return A thunk action that returns a user object on success or an error message on failure.
 */
export const registeringUserAsync = createAsyncThunk<
  User,
  { username: string; email: string; password: string },
  { rejectValue: any }
>("user/register", async (data, { rejectWithValue }) => {
  try {
    const userService = new UserService();
    const response = await userService.register(data);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    return rejectWithValue(errorMessage);
  }
});

/**
 * @brief Async thunk for logging in an existing user.
 * 
 * @param data An object containing email and password.
 * @return A thunk action that returns a user object on success or an error message on failure.
 */
export const loginUserAsync = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: any }
>("user/login", async (data, { rejectWithValue }) => {
  try {
    const userService = new UserService();
    const response = await userService.login(data);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Login failed";
    return rejectWithValue(errorMessage);
  }
});

/**
 * @brief Async thunk to fetch the currently authenticated user.
 * 
 * @return A thunk action that returns a user object on success or an error message on failure.
 */
export const gettingUserAsync = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const userService = new UserService();
      const response = await userService.getUser();
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data || "Fetching user failed";
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * @brief The reducer for the user slice.
 */
export default userSlice.reducer;

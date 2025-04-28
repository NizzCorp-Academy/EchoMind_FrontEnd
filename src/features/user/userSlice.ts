import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../services/userService";

/**
 * @interface User
 * @brief Represents a user object.
 */
interface User {
  id?: string;
  name?: string;
  email?: string;
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
 */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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

export default userSlice.reducer;

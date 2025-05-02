/**
 * @file store.ts
 * @brief Redux store configuration and type definitions for the EchoMind frontend application.
 * @author Jaseem
 * This file sets up the Redux store using Redux Toolkit, combining chat and user reducers.
 * It also exports TypeScript types for the store, state, dispatch, and thunks for use throughout the app.
 */

import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatSlice";
import userReducer from "../features/user/userSlice";
import { errorMiddleware } from "@/utils/errorMiddleware";

/**
 * @brief The main Redux store instance for the application.
 *
 * Combines chat and user reducers.
 */
export const store = configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware),
});

/**
 * @typedef AppStore
 * @brief Type representing the Redux store instance.
 */
export type AppStore = typeof store;

/**
 * @typedef RootState
 * @brief Type representing the root state object returned by the store.
 */
export type RootState = ReturnType<AppStore["getState"]>;

/**
 * @typedef AppDispatch
 * @brief Type representing the dispatch function from the Redux store.
 */
export type AppDispatch = AppStore["dispatch"];

/**
 * @typedef AppThunk
 * @template ThunkReturnType
 * @brief Generic type for Redux thunk actions.
 * @param ThunkReturnType The return type of the thunk action (defaults to void).
 */
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;

import { describe, it, expect, beforeEach, vi } from "vitest";
import reducer, {
    loginUserAsync,
    registeringUserAsync,
    gettingUserAsync,
} from "../features/user/userSlice";
import { InitialState } from "@/types/user.types";
vi.mock("../services/userService", () => {
    return {
        default: vi.fn().mockImplementation(() => ({
            register: vi.fn(),
            login: vi.fn(),
            getUser: vi.fn(),
            logOut: vi.fn(),
            initializeInterceptors: vi.fn(),
        })),
    };
});

const mockUser = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
};

let initialState: InitialState;

beforeEach(() => {
    initialState = {
        user: null,
        isLoggingUser: false,
        isRegisteringUser: false,
        isGettingUser: false,
        error: null,
    };
});

describe("userSlice async thunks", () => {
    it("should handle registeringUserAsync.pending", () => {
        const state = reducer(initialState, {
            type: registeringUserAsync.pending.type,
        });
        expect(state.isRegisteringUser).toBe(true);
        expect(state.error).toBeNull();
    });

    it("should handle registeringUserAsync.fulfilled", () => {
        const state = reducer(initialState, {
            type: registeringUserAsync.fulfilled.type,
            payload: mockUser,
        });
        expect(state.isRegisteringUser).toBe(false);
        expect(state.user).toEqual({
            id: "1",
            name: "Test User",
            email: "test@example.com",
        });
        expect(state.error).toBeNull();
    });

    it("should handle registeringUserAsync.rejected", () => {
        const state = reducer(initialState, {
            type: registeringUserAsync.rejected.type,
            payload: "Registration failed",
        });
        expect(state.isRegisteringUser).toBe(false);
        expect(state.error).toBe("Registration failed");
    });

    it("should handle loginUserAsync.pending", () => {
        const state = reducer(initialState, {
            type: loginUserAsync.pending.type,
        });
        expect(state.isLoggingUser).toBe(true);
        expect(state.error).toBeNull();
    });

    it("should handle loginUserAsync.fulfilled", () => {
        const state = reducer(initialState, {
            type: loginUserAsync.fulfilled.type,
            payload: mockUser,
        });
        expect(state.isLoggingUser).toBe(false);
        expect(state.user).toEqual(mockUser);
        expect(state.error).toBeNull();
    });

    it("should handle loginUserAsync.rejected", () => {
        const state = reducer(initialState, {
            type: loginUserAsync.rejected.type,
            payload: "Login failed",
        });
        expect(state.isLoggingUser).toBe(false);
        expect(state.error).toBe("Login failed");
    });

    it("should handle gettingUserAsync.pending", () => {
        const state = reducer(initialState, {
            type: gettingUserAsync.pending.type,
        });
        expect(state.isGettingUser).toBe(true);
        expect(state.error).toBeNull();
    });

    it("should handle gettingUserAsync.fulfilled", () => {
        const state = reducer(initialState, {
            type: gettingUserAsync.fulfilled.type,
            payload: mockUser,
        });
        expect(state.isGettingUser).toBe(false);
        expect(state.user).toEqual(mockUser);
        expect(state.error).toBeNull();
    });

    it("should handle gettingUserAsync.rejected", () => {
        const state = reducer(initialState, {
            type: gettingUserAsync.rejected.type,
            payload: "Fetching user failed",
        });
        expect(state.isGettingUser).toBe(false);
        expect(state.error).toBe("Fetching user failed");
    });
});

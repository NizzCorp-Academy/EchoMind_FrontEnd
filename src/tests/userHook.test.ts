import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import * as UserHook from "../hooks/userHook";
import * as userSlice from "../features/user/userSlice";
import { logout } from "../features/user/userSlice"; // import it at the top

// Mock react-redux
vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
}));

const mockDispatch = vi.fn();

vi.mock("../../features/user/userSlice", async (importOriginal) => {
    const actual = await importOriginal<typeof userSlice>();
    return {
        ...actual,
        logout: actual.logout,
        loginUserAsync: vi.fn(() => () => {}),
        registeringUserAsync: vi.fn(() => () => {}),
        gettingUserAsync: vi.fn(() => () => {}),
    };
});

vi.mock("@/services/userService", () => {
    return {
        default: vi.fn().mockImplementation(() => ({
            logOut: vi.fn(),
        })),
    };
});

describe("UserHook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    });

    it("useLogin returns correct values and dispatches login thunk", () => {
        (useSelector as unknown as Mock).mockImplementation((cb: any) =>
            cb({ user: { user: { name: "Test" }, isLoggingUser: true } })
        );

        const { user, loginUser, isLoggingUser } = UserHook.useLogin();

        expect(user).toEqual({ name: "Test" });
        expect(isLoggingUser).toBe(true);

        loginUser("test@example.com", "password");
        expect(mockDispatch).toHaveBeenCalled();
    });

    it("useRegister returns correct values and dispatches register thunk", () => {
        (useSelector as unknown as Mock).mockImplementation((cb: any) =>
            cb({ user: { user: { name: "NewUser" }, isRegisteringUser: true } })
        );

        const { user, registerUser, isRegisteringUser } =
            UserHook.useRegister();

        expect(user).toEqual({ name: "NewUser" });
        expect(isRegisteringUser).toBe(true);

        registerUser("username", "email@example.com", "password123");
        expect(mockDispatch).toHaveBeenCalled();
    });

    it("useGetUser returns correct values and dispatches get user thunk", () => {
        (useSelector as unknown as Mock).mockImplementation((cb: any) =>
            cb({ user: { user: { name: "LoggedUser" }, isGettingUser: true } })
        );

        const { user, getUser, isGettingUser } = UserHook.useGetUser();

        expect(user).toEqual({ name: "LoggedUser" });
        expect(isGettingUser).toBe(true);

        getUser();
        expect(mockDispatch).toHaveBeenCalled();
    });

    it("useLogout calls UserService to remove token and dispatches logout", () => {
        const { removeToken } = UserHook.useLogout();

        removeToken();

        expect(mockDispatch).toHaveBeenCalledWith(logout());
    });
});

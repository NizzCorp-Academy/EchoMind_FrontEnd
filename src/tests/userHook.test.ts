import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import UserHook from "../hooks/userHook";
import { registeringUserAsync } from "../features/user/userSlice";

// Mock react-redux hooks
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// Mock thunks/actions
const mockDispatch = vi.fn();
const mockLoginUserAsync = vi.fn(() => "loginThunk");
const mockregisteringUserAsync = vi.fn(() => "registerThunk");
const mockGettingUserAsync = vi.fn(() => "getUserThunk");

// Mock userSlice
vi.mock("../features/user/userSlice", () => ({
  loginUserAsync: (...args: any[]) => mockLoginUserAsync(...args),
  gettingUserAsync: (...args: any[]) => mockGettingUserAsync(...args),
  registeringUserAsync: (...args: any[]) => mockregisteringUserAsync(...args),
}));

describe("UserHook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as vi.Mock).mockReturnValue(mockDispatch);
  });

  it("useRegister returns user, registerUser, and isregisterUser; registerUser dispatches thunk", () => {
    // Fix: mock state shape to match what the hook expects
    (useSelector as unknown as vi.Mock).mockImplementation((cb) =>
      cb({ user: { user: {}, isRegisteringUser: true } })
    );
    const hook = new UserHook();
    const { user, registerUser, isRegisteringUser } = hook.useRegister();
    expect(user).toEqual({});
    expect(isRegisteringUser).toBe(true);
    registerUser("bob", "a@b.com", "pw");
    expect(mockregisteringUserAsync).toHaveBeenCalledWith({
      username: "bob",
      email: "a@b.com",
      password: "pw",
    });
    expect(mockDispatch).toHaveBeenCalledWith("registerThunk");
  });
  it("useLogin returns user, loginUser, and isLoggingUser; loginUser dispatches thunk", () => {
    // Fix: mock state shape to match what the hook expects
    (useSelector as unknown as vi.Mock).mockImplementation((cb) =>
      cb({ user: { user: { name: "bob" }, isLoggingUser: true } })
    );
    const hook = new UserHook();
    const { user, loginUser, isLoggingUser } = hook.useLogin();
    expect(user).toEqual({ name: "bob" });
    expect(isLoggingUser).toBe(true);
    loginUser("a@b.com", "pw");
    expect(mockLoginUserAsync).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "pw",
    });
    expect(mockDispatch).toHaveBeenCalledWith("loginThunk");
  });

  it("useGetUser returns user, getUser, and isGettingUser; getUser dispatches thunk", () => {
    // Fix: mock state shape to match what the hook expects
    (useSelector as unknown as vi.Mock).mockImplementation((cb) =>
      cb({ user: { user: { name: "alice" }, isGettingUser: false } })
    );
    const hook = new UserHook();
    const { user, getUser, isGettingUser } = hook.useGetUser();
    expect(user).toEqual({ name: "alice" });
    expect(isGettingUser).toBe(false);
    getUser();
    expect(mockGettingUserAsync).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith("getUserThunk");
  });
});

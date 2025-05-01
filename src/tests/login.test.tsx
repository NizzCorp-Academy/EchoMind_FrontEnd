import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";
import Login from "../components/Login";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useLogin, useGetUser } from "../hooks/userHook";

vi.mock("../hooks/userHook", () => ({
    useLogin: vi.fn(),
    useGetUser: vi.fn(),
}));
describe("Login Component", () => {
    it("calls loginUser on form submission", async () => {
        const mockLoginUser = vi.fn().mockResolvedValueOnce({});

        // Correct way to mock the hook
        vi.mocked(useLogin).mockReturnValue({
            user: { email: "test@test.com" },
            loginUser: mockLoginUser,
            isLoggingUser: false,
        });
        vi.mocked(useGetUser).mockReturnValue({
            user: { email: "test@test.com" },
            getUser: mockLoginUser,
            isGettingUser: false,
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@test.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(mockLoginUser).toHaveBeenCalledWith(
                "test@test.com",
                "password123"
            );
        });
    });
    it("shows error messages for invalid fields", async () => {
        const mockLoginUser = vi.fn().mockResolvedValueOnce({});

        vi.mocked(useLogin).mockReturnValue({
            user: { email: "test@test.com" },
            loginUser: mockLoginUser,
            isLoggingUser: false,
        });
        vi.mocked(useGetUser).mockReturnValue({
            user: { email: "test@test.com" },
            getUser: mockLoginUser,
            isGettingUser: false,
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(() => {
            expect(
                screen.getByText(/email is a required field/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/password is a required field/i)
            ).toBeInTheDocument();
        });
    });
    it("shows loading text when logging in", async () => {
        const mockLoginUser = vi.fn().mockResolvedValueOnce({});

        // Correct way to mock the hook
        vi.mocked(useLogin).mockReturnValue({
            user: { email: "test@test.com" },
            loginUser: mockLoginUser,
            isLoggingUser: true,
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByText(/logging.../i)).toBeInTheDocument();
    });
});

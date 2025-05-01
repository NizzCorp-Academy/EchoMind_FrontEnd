import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Signup from "../components/Signup";
import { useRegister } from "../hooks/userHook";

// Mock the entire userHook module
vi.mock("../hooks/userHook", () => ({
    useRegister: vi.fn(),
}));

describe("Signup Component", () => {
    it("calls registerUser on form submission", async () => {
        const mockRegisterUser = vi.fn().mockResolvedValueOnce({});

        // Correct way to mock the hook
        vi.mocked(useRegister).mockReturnValue({
            user: null,
            registerUser: mockRegisterUser,
            isRegisteringUser: false,
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </Provider>
        );

        // ...rest of your test
    });

    it("shows validation errors if fields are empty", async () => {
        // Correct way to mock the hook
        vi.mocked(useRegister).mockReturnValue({
            user: null,
            registerUser: vi.fn(),
            isRegisteringUser: false,
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </Provider>
        );

        // ...rest of your test
    });

    it("shows registering text when logging in", async () => {
        const mockRegisterUser = vi.fn().mockResolvedValueOnce({});

        // Correct way to mock the hook
        vi.mocked(useRegister).mockReturnValue({
            user: null,
            registerUser: mockRegisterUser,
            isRegisteringUser: true,
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Signup />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/registering.../i)).toBeInTheDocument();
    });
});

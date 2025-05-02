import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatScreenPage } from "../pages/ChatScreenPage";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@testing-library/jest-dom";

// Mock next-themes with both useTheme and ThemeProvider
vi.mock("next-themes", () => ({
    useTheme: () => ({ theme: "light" }),
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
    ),
}));

describe("ChatScreenPage", () => {
    const setup = () => {
        return render(
            <Provider store={store}>
                <MemoryRouter>
                    <ChatScreenPage />
                </MemoryRouter>
            </Provider>
        );
    };

    it("should render both sidebar and chat screen correctly", () => {
        setup();

        const chatScreen = screen.getByTestId("chat-screen-div-test-id");
        const sidebar = screen.getByTestId("side-bar-div-test-id");

        expect(chatScreen).toBeInTheDocument();
        expect(sidebar).toBeInTheDocument();
        expect(sidebar).not.toHaveAttribute("hidden");
        expect(chatScreen).toHaveClass("w-[80%]");
    });
});

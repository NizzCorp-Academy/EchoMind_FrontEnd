import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChatScreen } from "../components/ChatScreen";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ChatHook from "../hooks/chatHook";

// Define types for our mocks
interface Message {
    _id: string;
    message: string;
    isFromUser: boolean;
    chatId: string;
}

const mockMessages: Message[] = [
    { _id: "1", message: "Hello", isFromUser: true, chatId: "123" },
    { _id: "2", message: "Hi there", isFromUser: false, chatId: "123" },
];

// Mock ChatHook
vi.mock("../hooks/chatHook", () => {
    return {
        default: class {
            useGetMessage = () => ({
                isGettingMessage: false,
                messages: mockMessages,
                getMessages: vi.fn(),
                unSetMessages: vi.fn(),
            });
            useDeleteMessage = vi.fn().mockReturnValue({
                deleteMessage: vi.fn(),
                isDelettingMessage: false,
                messages: mockMessages,
            });
            useGetResponse = vi.fn().mockReturnValue({
                getResponse: vi.fn(),
                isGettingResponse: false,
                messages: mockMessages,
            });
            useGetChats = vi.fn().mockReturnValue({
                chats: [],
                isGettingChat: false,
                getChats: vi.fn(),
            });
        },
    };
});

// Mock UserHook
vi.mock("../hooks/userHook", () => {
    return {
        default: class {
            useGetUser = vi.fn().mockReturnValue({
                user: { username: "Test User" },
            });
        },
    };
});

// Mock next-themes
vi.mock("next-themes", () => ({
    useTheme: () => ({ theme: "light" }),
}));

describe("ChatScreen Component", () => {
    const mockProps = {
        isOpen: false,
        toggleSideBar: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const setup = () =>
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ChatScreen {...mockProps} />
                </MemoryRouter>
            </Provider>
        );

    it("renders basic chat interface", () => {
        setup();
        expect(
            screen.getByPlaceholderText("Say Something")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("prompt-screen-send-button")
        ).toBeInTheDocument();
    });

    it("displays existing messages", () => {
        setup();
        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("Hi there")).toBeInTheDocument();
    });

    it("shows welcome screen for empty messages", () => {
        // Create an instance of ChatHook before rendering
        const { useGetMessage } = new ChatHook();

        // Mock the useGetMessage method to return empty messages
        const mockGetMessage = vi.fn().mockReturnValue({
            isGettingMessage: false,
            messages: undefined,
            getMessages: vi.fn(),
            unSetMessages: vi.fn(),
        });

        // Apply the spy to the instance
        // vi.spyOn(chatHook, "useGetMessage").mockImplementation(mockGetMessage);

        // Mock the ChatHook constructor to return our instance
        // vi.spyOn(ChatHook.prototype, "useGetMessage").mockImplementation(
        //     mockGetMessage
        // );
        useGetMessage: vi.fn().mockImplementation(mockGetMessage);
        setup();
        const chatscreen = screen.getByTestId("prompt-screen-with-nothing");
        expect(chatscreen).toHaveTextContent("hello");
    });

    it("handles message submission", () => {
        console.log(Object.getOwnPropertyNames(ChatHook.prototype));

        const mockGetResponse = vi.fn();
        let { useGetResponse } = new ChatHook();

        // Mock the useGetResponse method
        const mockUseGetResponse = vi.fn().mockReturnValue({
            getResponse: mockGetResponse,
            isGettingResponse: false,
        });

        // Apply the spy to both the instance and prototype
        useGetResponse = vi.fn().mockReturnValue({
            getResponse: mockUseGetResponse,
            messages: undefined,
            isGettingResponse: false,
        });
        // vi.spyOn(ChatHook.prototype, 'useGetResponse').mockImplementation(mockUseGetResponse);

        setup();

        const input = screen.getByPlaceholderText("Say Something");
        const sendButton = screen.getByTestId("prompt-screen-send-button");

        fireEvent.change(input, { target: { value: "test message" } });
        fireEvent.click(sendButton);

        expect(mockGetResponse).toHaveBeenCalledWith("test message", undefined);
    });
});

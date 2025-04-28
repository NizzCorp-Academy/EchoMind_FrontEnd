import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ChatScreen } from "../components/ChatScreen";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ChatHook from "../hooks/chatHook";
import userEvent from "@testing-library/user-event";

// Single ChatHook mock
vi.mock("../hooks/chatHook", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      useGetMessage: vi.fn().mockReturnValue({
        isGettingMessage: false,
        messages: [
          { _id: "1", message: "Hello", isFromUser: true },
          { _id: "2", message: "Hi there", isFromUser: false },
        ],
        getMessages: vi.fn(),
      }),
      useDeleteMessage: vi.fn().mockReturnValue({
        deleteMessage: vi.fn(),
      }),
      useGetResponse: vi.fn().mockReturnValue({
        getResponse: vi.fn(),
        isGettingResponse: false,
      }),
      useEditChat: vi.fn().mockReturnValue({
        editChat: vi.fn(),
        isUpdattingChat: false,
      }),
      useGetChats: vi.fn().mockReturnValue({
        chats: [],
        isGettingChat: false,
        getChats: vi.fn(),
      }),
      useDeleteChat: vi.fn().mockReturnValue({
        deleteChat: vi.fn(),
        isDelettingMessage: false,
      }),
    })),
  };
});

// Mock the UserHook
vi.mock("../hooks/userHook", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      useGetUser: vi.fn().mockReturnValue({
        user: { name: "Test User" },
      }),
    })),
  };
});

describe("ChatScreen Component", () => {
  const mockProps = {
    isDark: false,
    toggleMode: vi.fn(),
    isOpen: false,
    toggleSideBar: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = (props = mockProps) =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ChatScreen {...props} />
        </MemoryRouter>
      </Provider>
    );

  it("renders ChatScreen component with basic elements", () => {
    setup();
    expect(screen.getByPlaceholderText("Say Something")).toBeInTheDocument();
    expect(screen.getByTestId("prompt-screen-send-button")).toBeInTheDocument();
  });

  it("displays messages when they exist", () => {
    setup();
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there")).toBeInTheDocument();
  });

  it("shows welcome screen when no messages exist", () => {
    vi.mocked(ChatHook).mockImplementation(() => ({
      useGetMessage: vi.fn().mockReturnValue({
        isGettingMessage: false,
        messages: null,
        getMessages: vi.fn(),
      }),
      useDeleteMessage: vi.fn().mockReturnValue({
        deleteMessage: vi.fn(),
      }),
      useGetResponse: vi.fn().mockReturnValue({
        getResponse: vi.fn(),
        isGettingResponse: false,
      }),
      useEditChat: vi.fn().mockReturnValue({
        editChat: vi.fn(),
      }),
      useGetChats: vi.fn().mockReturnValue({
        chats: [],
        getChats: vi.fn(),
      }),
      useDeleteChat: vi.fn().mockReturnValue({
        deleteChat: vi.fn(),
      }),
    }));

    setup();
    expect(screen.getByText("How Can I Help You?")).toBeInTheDocument();
  });

  // it("applies dark mode styles correctly", async () => {
  //   const user = userEvent.setup();
  //   let container: HTMLElement;

  //   // Test light mode
  //   const toggleMode = vi.fn();
  //   const { rerender } = setup({ ...mockProps, isDark: false, toggleMode });

  //   container = screen.getByTestId("chat-screen-message-screen-1");
  //   expect(container).toHaveClass("bg-[#F5F5F5]");

  //   // Toggle dark mode
  //   const darkModeButton = screen.getByTestId("chat-nav-bar-toggle-dark-mode");
  //   await user.click(darkModeButton);
  //   await user.click(darkModeButton);
  //   expect(toggleMode).toHaveBeenCalled();

  //   // Rerender with dark mode
  //   rerender(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <ChatScreen {...mockProps} isDark={true} toggleMode={toggleMode} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   container = screen.getByTestId("chat-screen-message-screen-1");
  //   expect(container).toHaveClass("bg-[#472c66]");
  // });

  it("handles message input and sending", async () => {
    const mockGetResponse = vi.fn();
    vi.mocked(ChatHook).mockImplementation(() => ({
      useGetMessage: vi.fn().mockReturnValue({
        isGettingMessage: false,
        messages: [],
        getMessages: vi.fn(),
      }),
      useDeleteMessage: vi.fn().mockReturnValue({
        deleteMessage: vi.fn(),
      }),
      useGetResponse: vi.fn().mockReturnValue({
        getResponse: mockGetResponse,
        isGettingResponse: false,
      }),
      useEditChat: vi.fn().mockReturnValue({
        editChat: vi.fn(),
        isUpdattingChat: false,
      }),
      useGetChats: vi.fn().mockReturnValue({
        chats: [],
        isGettingChat: false,
        getChats: vi.fn(),
      }),
      useDeleteChat: vi.fn().mockReturnValue({
        deleteChat: vi.fn(),
        isDelettingMessage: false,
      }),
    }));

    setup();

    const input = screen.getByPlaceholderText("Say Something");
    fireEvent.change(input, { target: { value: "test message" } });

    const sendButton = screen.getByTestId("prompt-screen-send-button");
    fireEvent.click(sendButton);

    expect(mockGetResponse).toHaveBeenCalledWith(
      "test message",
      "680349077b6f464fef06f6da"
    );
  });
});

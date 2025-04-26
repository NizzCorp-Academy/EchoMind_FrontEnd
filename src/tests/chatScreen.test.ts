import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ChatScreen } from "../components/ChatScreen";
import ChatHook from "../hooks/chatHook";
import UserHook from "../hooks/userHook";
import type { ComponentProps } from "react";

type ChatScreenProps = ComponentProps<typeof ChatScreen>;

describe("teting", () => {
  render(<div></div>);
});

// Mock the hooks
vi.mock("../hooks/chatHook", () => ({
  default: class {
    useGetMessage = () => ({
      isGettingMessage: false,
      messages: [],
      getMessages: vi.fn(),
    });
    useDeleteMessage = () => ({
      deleteMessage: vi.fn(),
    });
    useGetResponse = () => ({
      getResponse: vi.fn(),
      isGettingResponse: false,
    });
  },
}));
// Mock the hooks
vi.mock("../hooks/userHook", () => ({
  default: class {
    useGetUser = () => ({
      user: { name: "Test User" },
    });
  },
}));

afterEach(() => {
  cleanup();
});

describe("ChatScreen Component", () => {
  const mockMessages = [
    { _id: "1", message: "Hello", isFromUser: true },
    { _id: "2", message: "Hi there", isFromUser: false },
  ];

  const mockProps = {
    isDark: false,
    toggleMode: vi.fn(),
    isOpen: false,
    toggleSideBar: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock ChatHook implementation
    (ChatHook as any).mockImplementation(() => ({
      useGetMessage: () => ({
        isGettingMessage: false,
        messages: mockMessages,
        getMessages: vi.fn(),
      }),
      useDeleteMessage: () => ({
        deleteMessage: vi.fn(),
      }),
      useGetResponse: () => ({
        getResponse: vi.fn(),
        isGettingResponse: false,
      }),
    }));

    // Mock UserHook implementation
    (UserHook as any).mockImplementation(() => ({
      useGetUser: () => ({
        user: { name: "Test User" },
      }),
    }));
  });

  it("renders the input field and send button", () => {
    render(<ChatScreen {...mockProps} />);

    expect(screen.getByPlaceholderText("Say Something")).toBeInTheDocument();
    expect(
      screen.getByRole("div", {
        name: /send/i,
        hidden: true,
      })
    ).toBeInTheDocument();
  });

  it("displays messages when they exist", () => {
    render(<ChatScreen {...mockProps} />);

    mockMessages.forEach((message) => {
      expect(screen.getByText(message.message)).toBeInTheDocument();
    });
  });

  it("shows welcome screen when no messages exist", () => {
    (ChatHook as any).mockImplementation(() => ({
      useGetMessage: () => ({
        isGettingMessage: false,
        messages: null,
        getMessages: vi.fn(),
      }),
      useDeleteMessage: () => ({
        deleteMessage: vi.fn(),
      }),
      useGetResponse: () => ({
        getResponse: vi.fn(),
        isGettingResponse: false,
      }),
    }));

    render(<ChatScreen {...mockProps} />);
    expect(screen.getByText("How Can I Help You?")).toBeInTheDocument();
  });

  it("applies dark mode styles correctly", () => {
    render(<ChatScreen {...mockProps} isDark={true} />);

    const promptContainer = screen
      .getByPlaceholderText("Say Something")
      .closest("div");
    expect(promptContainer).toHaveClass("bg-[#472c66]");
  });

  it("handles message input and sending", () => {
    const mockGetResponse = vi.fn();
    (ChatHook as any).mockImplementation(() => ({
      useGetMessage: () => ({
        isGettingMessage: false,
        messages: mockMessages,
        getMessages: vi.fn(),
      }),
      useDeleteMessage: () => ({
        deleteMessage: vi.fn(),
      }),
      useGetResponse: () => ({
        getResponse: mockGetResponse,
        isGettingResponse: false,
      }),
    }));

    render(<ChatScreen {...mockProps} />);

    const input = screen.getByPlaceholderText("Say Something");
    fireEvent.change(input, { target: { value: "test message" } });

    const sendButton = screen.getByRole("div", { name: /send/i, hidden: true });
    fireEvent.click(sendButton);

    expect(mockGetResponse).toHaveBeenCalledWith(
      "test message",
      "680349077b6f464fef06f6da"
    );
  });
});

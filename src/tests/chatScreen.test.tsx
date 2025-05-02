import { render, screen, fireEvent, act } from "@testing-library/react";
import { ChatScreen } from "../components/ChatScreen";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as chatHook from "../hooks/chatHook";
import * as userHook from "../hooks/userHook";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

describe("ChatScreen", () => {
  const toggleSideBar = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("calls getResponse on prompt submit", async () => {
    const getResponse = vi.fn();

    vi.spyOn(chatHook, "useGetMessage").mockReturnValue({
      messages: [],
      isGettingMessage: false,
      getMessages: vi.fn(),
      unSetMessages: vi.fn(),
    });

    vi.spyOn(chatHook, "useGetResponse").mockReturnValue({
      getResponse,
      isGettingResponse: false,
      messages: [],
    });

    vi.spyOn(chatHook, "useDeleteMessage").mockReturnValue({
      messages: [],
      deleteMessage: vi.fn(),
      isDelettingMessage: false,
    });

    vi.spyOn(userHook, "useGetUser").mockReturnValue({
      user: { email: "test@gmail.com", username: "TestUser" },
      getUser: vi.fn(),
      isGettingUser: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/chats/123"]}>
          <Routes>
            <Route
              path="/chats/:chatId"
              element={<ChatScreen isOpen={true} toggleSideBar={vi.fn()} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText("Say Something");
    const button = screen.getByTestId("prompt-screen-send-button");
    act(() => {
      fireEvent.change(input, { target: { value: "What is AI?" } });
      fireEvent.click(button);
    });

    expect(getResponse).toHaveBeenCalledWith("What is AI?", "123");
  });
  it("renders messages when available ,useGetMessage", () => {
    vi.spyOn(chatHook, "useGetMessage").mockReturnValue({
      messages: [
        { _id: "1", message: "Hello", isFromUser: true, chatId: "123" },
        { _id: "2", message: "Hi there!", isFromUser: false, chatId: "123" },
      ],
      isGettingMessage: false,
      getMessages: vi.fn(),
      unSetMessages: vi.fn(),
    });

    vi.spyOn(chatHook, "useGetResponse").mockReturnValue({
      getResponse: vi.fn(),
      isGettingResponse: false,
      messages: [],
    });

    vi.spyOn(chatHook, "useDeleteMessage").mockReturnValue({
      messages: [],
      deleteMessage: vi.fn(),
      isDelettingMessage: false,
    });

    vi.spyOn(userHook, "useGetUser").mockReturnValue({
      user: { email: "test@gmail.com", username: "TestUser" },
      getUser: vi.fn(),
      isGettingUser: false,
    });

    render(
      <MemoryRouter initialEntries={["/chats/123"]}>
        <Routes>
          <Route
            path="/chats/:chatId"
            element={<ChatScreen isOpen={true} toggleSideBar={toggleSideBar} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });
  it("Delte messages when clcik delete", () => {
    const deleteMessage = vi.fn();
    vi.spyOn(chatHook, "useGetMessage").mockReturnValue({
      messages: [
        { _id: "1", message: "Hello", isFromUser: true, chatId: "123" },
        { _id: "2", message: "Hi there!", isFromUser: false, chatId: "123" },
      ],
      isGettingMessage: false,
      getMessages: vi.fn(),
      unSetMessages: vi.fn(),
    });

    vi.spyOn(chatHook, "useGetResponse").mockReturnValue({
      getResponse: vi.fn(),
      isGettingResponse: false,
      messages: [],
    });

    vi.spyOn(chatHook, "useDeleteMessage").mockReturnValue({
      messages: [],
      deleteMessage,
      isDelettingMessage: false,
    });

    vi.spyOn(userHook, "useGetUser").mockReturnValue({
      user: { email: "test@gmail.com", username: "TestUser" },
      getUser: vi.fn(),
      isGettingUser: false,
    });

    render(
      <MemoryRouter initialEntries={["/chats/1"]}>
        <Routes>
          <Route
            path="/chats/:chatId"
            element={<ChatScreen isOpen={true} toggleSideBar={toggleSideBar} />}
          />
        </Routes>
      </MemoryRouter>
    );
    const deleteButtons = screen.getAllByTestId("message-delete-button");
    act(() => {
      fireEvent.click(deleteButtons[0]); // Click the first delete button
    });
    expect(deleteMessage).toHaveBeenCalledWith("1"); // The _id of the first message
  });
});

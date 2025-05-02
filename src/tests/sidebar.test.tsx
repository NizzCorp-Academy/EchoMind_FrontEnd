import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import Sidebar from "../components/Sidebar";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { useGetChats, useDeleteChat, useEditChat } from "../hooks/chatHook";

const ChatScreenMock = () => <h1>Hello User</h1>;

vi.mock("../hooks/chatHook", () => ({
    useDeleteChat: vi.fn(),
    useEditChat: vi.fn(),
    useGetChats: vi.fn(),
}));

describe("Sidebar Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useGetChats).mockReturnValue({
            chats: [],
            isGettingChat: false,
            getChats: vi.fn(),
        });

        vi.mocked(useDeleteChat).mockReturnValue({
            chats: [],
            deleteChat: vi.fn(),
            isDelettingMessage: false,
        });
        vi.mocked(useEditChat).mockReturnValue({
            chats: [],
            editChat: vi.fn(),
            isUpdattingChat: false,
        });
    });
    const setup = () =>
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Sidebar isOpen={true} toggleSideBar={() => {}} />
                </MemoryRouter>
            </Provider>
        );

    it("renders Sidebar component", () => {
        setup();
        expect(screen.getByText("New Chat")).toBeInTheDocument();
        expect(screen.getByText("Recents")).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("shows 'No chat Found' if no chats are available", () => {
        setup();
        expect(screen.getByText("No chat Found")).toBeInTheDocument();
    });

    it("shows 'Updating Chat Title...' when isUpdattingChat is true", async () => {
        vi.mocked(useGetChats).mockReturnValue({
            chats: [],
            isGettingChat: false,
            getChats: vi.fn(),
        });
        vi.mocked(useDeleteChat).mockReturnValue({
            chats: [],
            deleteChat: vi.fn(),
            isDelettingMessage: false,
        });
        vi.mocked(useEditChat).mockReturnValue({
            chats: [],
            editChat: vi.fn(),
            isUpdattingChat: true,
        });

        setup();
        expect(
            await screen.findByText("Updating Chat Title...")
        ).toBeInTheDocument();
    });

    it("should call useEditChat and update the chat title", async () => {
        const editChatMock = vi.fn();
        const getChatsMock = vi.fn();
        vi.mocked(useGetChats).mockReturnValue({
            chats: [
                {
                    _id: "chatId",
                    title: "Old Title",
                    createdAt: "lskdjflsd",
                    updatedAt: "lsdjflsd",
                },
            ],
            isGettingChat: false,
            getChats: getChatsMock,
        });
        vi.mocked(useEditChat).mockReturnValue({
            chats: [],
            editChat: editChatMock,
            isUpdattingChat: false,
        });

        setup();
        const threeDot = screen.getByTestId("threeDot");
        fireEvent.click(threeDot);

        const renameOption = await screen.findByText("Rename");
        fireEvent.click(renameOption);

        const input = screen.getByDisplayValue("Old Title");
        fireEvent.change(input, { target: { value: "New Title" } });

        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        expect(editChatMock).toHaveBeenCalledWith("chatId", "New Title");
    });

    it("should call useDeleteChat and delete the chat", async () => {
        const deleteChatMock = vi.fn();
        vi.mocked(useGetChats).mockReturnValue({
            chats: [
                {
                    _id: "chatId",
                    title: "Old Title",
                    createdAt: "lskdjflsd",
                    updatedAt: "lsdjflsd",
                },
            ],
            isGettingChat: false,
            getChats: vi.fn(),
        });
        vi.mocked(useDeleteChat).mockReturnValue({
            chats: [],
            deleteChat: deleteChatMock,
            isDelettingMessage: false,
        });
        setup();
        const threeDot = screen.getByTestId("threeDot");
        fireEvent.click(threeDot);

        const deleteButton = await screen.findByText("Delete");
        fireEvent.click(deleteButton);

        expect(deleteChatMock).toHaveBeenCalledWith("chatId");
    });

    it("calls navigate when clicking the New Chat button", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/chats/123"]}>
                    <Routes>
                        <Route
                            path="/chats/123"
                            element={
                                <Sidebar
                                    isOpen={true}
                                    toggleSideBar={() => {}}
                                />
                            }
                        />
                        <Route path="/" element={<ChatScreenMock />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const button = screen.getByText("New Chat");
        fireEvent.click(button);

        expect(await screen.findByText(/Hello User/i)).toBeInTheDocument();
    });
});

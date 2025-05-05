export interface ChatState {
    error: any;
    chats:
        | { _id: string; title: string; createdAt: string; updatedAt: string }[]
        | undefined;
    isGettingChat: boolean;
    isUpdattingChat: boolean;
    isDelettingChat: boolean;
    isGettingMessage: boolean;
    isDelettingMessage: boolean;
    isGettingResponse: boolean;
    messages:
        | {
              isFromUser: boolean;
              _id: string;
              chatId: string;
              message: string;
          }[]
        | undefined;
}

/**
 * @var initialState
 * @brief Initial state for the chat slice.
 */
export const initialState: ChatState = {
    chats: undefined,
    error: null,
    messages: undefined,
    isDelettingChat: false,
    isDelettingMessage: false,
    isGettingChat: false,
    isGettingResponse: false,
    isGettingMessage: false,
    isUpdattingChat: false,
};

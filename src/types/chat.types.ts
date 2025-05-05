/**
 * @brief Redux slice for chat state.
 */
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

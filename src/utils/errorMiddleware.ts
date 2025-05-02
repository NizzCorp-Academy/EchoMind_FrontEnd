// errorMiddleware.ts
import { isRejected, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejected(action)) {
        console.error("Global async error caught:", action.error);
        let errorMessage =
            action.error.message === "Request failed with status code 400" &&
            "Something went wrong!";
        console.log(errorMessage);
        const errorDescription =
            (action.payload as string) ||
            "An error occurred while processing your request.";
        if (errorMessage !== "Something went wrong!") {
            toast(errorMessage, {
                description: errorDescription,
            });
        }

        // Show a toast, modal, or dispatch a global error slice action
        // Example: toast.error(action.error.message || 'Something went wrong!');
    }

    return next(action);
};

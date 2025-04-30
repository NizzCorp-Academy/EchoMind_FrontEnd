// errorMiddleware.ts
import { isRejected, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejected(action)) {
        console.error("Global async error caught:", action.error);
        console.log(action);
        let errorMessage = action.error.message || "Something went wrong!";
        const errorDescription =
            (action.payload as string) ||
            "An error occurred while processing your request.";
        toast(errorMessage, {
            description: errorDescription,
        });

        // Show a toast, modal, or dispatch a global error slice action
        // Example: toast.error(action.error.message || 'Something went wrong!');
    }

    return next(action);
};

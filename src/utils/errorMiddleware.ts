// errorMiddleware.ts
import { isRejected, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    console.error("Global async error caught:", action.error);
    toast(action.error.message || "Something went wrong!");

    // Show a toast, modal, or dispatch a global error slice action
    // Example: toast.error(action.error.message || 'Something went wrong!');
  }

  return next(action);
};

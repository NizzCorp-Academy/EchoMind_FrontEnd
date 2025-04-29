import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "./components/sonner.tsx";
import { ChatScreenPage } from "./pages/ChatScreenPage.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider
                defaultTheme="light"
                children={
                    <Provider store={store}>
                        <Routes>
                            <Route path="/" element={<ChatScreenPage />} />
                            <Route
                                path="/chats/:chatId"
                                element={<ChatScreenPage />}
                            />
                        </Routes>
                        <Toaster />
                    </Provider>
                }
            ></ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);

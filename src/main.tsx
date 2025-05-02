import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter} from "react-router";
import { Toaster } from "./components/sonner.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider
                defaultTheme="light"
                children={
                    <Provider store={store}>
                        <App />
                        <Toaster />
                    </Provider>
                }
            ></ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);

import ErrorBoundary from "./components/ErrorBoundery";
import { ChatScreenPage } from "./pages/ChatScreenPage";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Route, Router, Routes } from "react-router";

function App() {
    return (
        <div className="html ">
            {/* <LandingPage /> */}
            {/* <Login/> */}
            {/* <Signup/> */}
            {/* <Sidedbar/> */}
            <ErrorBoundary
                fallback={
                    <div className="w-screen h-screen flex items-center justify-center">
                        <div className="text-red-500 font-bold font-mono">
                            Something went wrong
                        </div>
                    </div>
                }
            >
                <ThemeProvider defaultTheme="dark">
                    {/* <BrowserRouter>
                        <Routes> */}
                    {/* <Route
                                    path="/c/:chatId"
                                    element={<ChatScreenPage />}
                                /> */}
                    {/* <Route path="/" element={<ChatScreenPage />} /> */}
                    {/* </Routes>
                    </BrowserRouter> */}
                </ThemeProvider>
            </ErrorBoundary>
        </div>
    );
}

export default App;

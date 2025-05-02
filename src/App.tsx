/**
 * @file App.tsx
 * @brief Main routing component for the application using React Router v6.
 * @author Muhammad Haseen
 *
 * This file defines the routing structure of the app, mapping URLs to specific pages or components.
 * It includes conditional rendering based on the user's authentication status.
 */

import { Route, Routes } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ChatScreenPage } from "./pages/ChatScreenPage";
import ErrorFile from "./components/ErrorFile";
import { useGetUser } from "./hooks/userHook";
import { useEffect } from "react";

/**
 * @brief Main application component for managing routes.
 *
 * Handles protected routes by checking for user authentication state
 * using a custom `UserHook`. Redirects unauthenticated users to the
 * login page for protected routes.
 *
 * @returns {JSX.Element} The rendered routing structure of the app.
 */
const App = () => {
    const { user, getUser } = useGetUser();

    useEffect(() => {
        getUser();
    }, []);
    return (
        <Routes>
            <Route path="*" element={<ErrorFile />} />
            <Route path="/home" element={<LandingPage />} />

            <Route
                path="/login"
                element={user ? <ChatScreenPage /> : <Login />}
            />
            <Route
                path="/register"
                element={user ? <ChatScreenPage /> : <Signup />}
            />
            <Route
                path="/chats/:chatId"
                element={!user ? <Login /> : <ChatScreenPage />}
            />
            <Route path="/" element={!user ? <Login /> : <ChatScreenPage />} />
        </Routes>
    );
};

export default App;

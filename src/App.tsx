import { Route, Routes, useLocation } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ChatScreenPage } from "./pages/ChatScreenPage";
import ErrorFile from "./components/ErrorFile";

const App = () => {
    return (
        <Routes>
            <Route path="*" element={<ErrorFile />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/chats/:chatId" element={<ChatScreenPage />} />
            <Route path="/" element={<ChatScreenPage />} />
        </Routes>
    );
};

export default App;

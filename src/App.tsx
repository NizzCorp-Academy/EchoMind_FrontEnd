
import { Route, Routes, useLocation } from 'react-router'
import { LandingPage } from './pages/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'
import { ChatScreenPage } from './pages/ChatScreenPage'

const App = () => {
  const url = useLocation()
  const location =url.pathname
  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/chats/:chatId" element={<ChatScreenPage location={location}/>} />
  </Routes>
  )
}

export default App
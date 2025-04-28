
import { Route, Routes, useLocation } from 'react-router'
import { LandingPage } from './pages/LandingPage'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  const location = useLocation()
  console.log(location)
  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
  </Routes>
  )
}

export default App
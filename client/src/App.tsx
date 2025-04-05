import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Puedes añadir más páginas aquí conforme las crees
// import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </div>
  )
}

export default App

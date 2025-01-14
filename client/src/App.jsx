import React from 'react';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import MenuPage from './pages/MenuPage';
import HomePage from './pages/HomePage';
import CreateMenu from './components/CreateMenu';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menu/create" element={<CreateMenu />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

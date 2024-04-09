import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ManagementPage from './pages/ManagementPage';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/management/content-category" element={<ManagementPage />} />
          <Route path="/management/content" element={<ManagementPage />} />
          <Route path="/management/topic" element={<ManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

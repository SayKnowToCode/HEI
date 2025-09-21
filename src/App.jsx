// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from '@/pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CollegeDashboard from './pages/CollegeDashboard';

const App = () => {
  return (
    <div>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/college-dashboard" element={<CollegeDashboard />} />
      </Routes>
    </div>
  );
};


export default App;
// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Women from './pages/Women';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Front from './pages/Front';
import Landing from './pages/Landing';
import styled from 'styled-components';
import './App.css';

const NavbarWrapper = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: calc(100% - 60px); // Adjust based on navbar height
`;

function App() {
  return (
    <Router>
      <div className="mobile-viewport">
        <AppContent />
      </div>
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <ContentWrapper>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/front" element={<Front />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/women" element={<Women />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </AnimatePresence>
      </ContentWrapper>
      <NavbarWrapper>
        {/* Navbar will be part of each page component */}
      </NavbarWrapper>
    </>
  );
};

export default App;
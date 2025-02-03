// src/Routes.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import PuzzlePage from './pages/PuzzlePage';
import GiftShopPage from './pages/GiftShopPage';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/puzzle" element={<PuzzlePage />} />
        <Route path="/shop" element={<GiftShopPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
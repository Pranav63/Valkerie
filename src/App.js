// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import PuzzlePage from './pages/PuzzlePage';
import GiftShopPage from './pages/GiftShopPage';
import { GameProvider } from './context/GameContext';
import TimelinePage from './pages/TimelinePage';
import QuizPage from './pages/QuizPage';
import FuturePlansPage from './pages/FuturePlansPage';
import LoveNotesPage from './pages/LoveNotesPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF1493',
    },
    secondary: {
      main: '#FFF0F5',
    },
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/puzzle" element={<PuzzlePage />} />
              <Route path="/shop" element={<GiftShopPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/future-plans" element={<FuturePlansPage />} />
              <Route path="/love-notes" element={<LoveNotesPage />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
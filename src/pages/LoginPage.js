// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const hints = [
    "💝 It's all lowercase and 2 words written together",
    "🌮 It's a Mexican word that makes me smile",
    "💕 I love it when you say it!"
  ];

  const handleLogin = () => {
    if (code.toLowerCase() === 'pocoloco') {
      navigate('/puzzle');
    } else {
      setAttempts(prev => prev + 1);
      setShowHint(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%)',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: '40px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: 4,
              textAlign: 'center',
              color: '#FF1493',
              fontWeight: 'bold',
            }}
          >
            Enter Our Special Word
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your special word..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ marginBottom: 3 }}
          />

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Alert 
                  severity="info" 
                  sx={{ marginBottom: 2 }}
                >
                  {hints[Math.min(attempts - 1, hints.length - 1)]}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              borderRadius: '25px',
              padding: '12px',
              background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
            }}
          >
            Enter
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default LoginPage;
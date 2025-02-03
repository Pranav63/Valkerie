// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleLogin = () => {
    // Add validation logic here if needed
    navigate('/puzzle');
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
            Enter Your Special Code
          </Typography>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your secret code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{
              marginBottom: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#FF69B4',
                },
                '&:hover fieldset': {
                  borderColor: '#FF1493',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF1493',
                },
              },
            }}
          />
          
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              borderRadius: '25px',
              padding: '12px',
              background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF69B4 30%, #FF1493 90%)',
                transform: 'scale(1.02)',
                transition: 'transform 0.2s',
              }
            }}
          >
            Begin Our Journey
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default LoginPage;
// src/pages/WelcomePage.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%)',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            color: '#FF1493',
            textAlign: 'center',
            marginBottom: 2,
            fontSize: { xs: '2rem', md: '3.75rem' },
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          Valentine Love Cart ❤️
        </Typography>
        
        <Typography 
          variant="h5"
          sx={{ 
            color: '#DB7093',
            textAlign: 'center',
            marginBottom: 4,
            fontSize: { xs: '1.2rem', md: '1.5rem' }
          }}
        >
          A Special Journey Awaits
        </Typography>

        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/login')}
            sx={{ 
              borderRadius: '25px',
              padding: '12px 40px',
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF69B4 30%, #FF1493 90%)',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s',
              }
            }}
          >
            Begin Journey
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}

export default WelcomePage;
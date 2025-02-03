// src/pages/PuzzlePage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MemoryPuzzle from '../components/MemoryPuzzle';
import { useGame } from '../context/GameContext';

function PuzzlePage() {
  const navigate = useNavigate();
  const { setPuzzleProgress } = useGame();
  const [isCompleted, setIsCompleted] = useState(false);

  const puzzleImages = [
    '/puzzle/golu1.jpeg',
    '/puzzle/golu2.jpeg',
    '/puzzle/golu3.jpeg',
    '/puzzle/golu4.jpeg',
  ];

  useEffect(() => {
    console.log('Loading puzzle images:', puzzleImages);
    puzzleImages.forEach(img => {
      const image = new Image();
      image.onload = () => console.log(`Image loaded successfully: ${img}`);
      image.onerror = () => console.error(`Failed to load image: ${img}`);
      image.src = img;
    });
  }, []);

  const handlePuzzleComplete = () => {
    console.log('Puzzle completed!');
    setIsCompleted(true);
    setPuzzleProgress(prev => prev + 1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%)',
        padding: '20px',
      }}
    >
      <Grid container spacing={3} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid item xs={12}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                color: '#FF1493',
                marginBottom: 4,
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {isCompleted ? 'Puzzle Completed! 🎉' : 'Match the Memory Cards'}
            </Typography>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={8} sx={{ margin: '0 auto' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: '30px',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h5" sx={{ textAlign: 'center', color: '#DB7093', marginBottom: 3 }}>
                    You've unlocked special gifts in the shop! 🎁
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/shop')}
                      sx={{
                        borderRadius: '25px',
                        padding: '12px 30px',
                        background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
                      }}
                    >
                      Visit Gift Shop
                    </Button>
                  </Box>
                </motion.div>
              ) : (
                <MemoryPuzzle 
                  images={puzzleImages} 
                  onComplete={handlePuzzleComplete}
                />
              )}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PuzzlePage;
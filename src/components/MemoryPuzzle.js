// src/components/MemoryPuzzle.js
import React, { useState, useEffect } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';

const MemoryPuzzle = ({ images, onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    // Simply duplicate each image
    const pairs = [...images, ...images];
    
    // Create cards with their images and randomize positions
    const initialCards = pairs.map((image, index) => ({
      id: index,
      image: image
    }));

    const shuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, [images]);

  const handleCardClick = (cardId) => {
    // Prevent clicking if two cards are already flipped
    if (flipped.length === 2) return;
    // Prevent clicking already matched or flipped cards
    if (matched.includes(cardId) || flipped.includes(cardId)) return;

    // Add clicked card to flipped array
    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      // Compare the actual image paths
      if (firstCard.image === secondCard.image) {
        // Match found - add to matched array
        setMatched([...matched, firstId, secondId]);
        setFlipped([]);

        // Check if game is complete
        if (matched.length + 2 === cards.length) {
          onComplete();
        }
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid item xs={3} key={card.id}>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Paper
              onClick={() => handleCardClick(index)}
              sx={{
                height: 120,
                cursor: 'pointer',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: flipped.includes(index) || matched.includes(index) 
                  ? 'rotateY(180deg)' 
                  : 'rotateY(0deg)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#FF69B4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                }}
              >
                ❤️
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <img 
                  src={card.image} 
                  alt="memory card"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default MemoryPuzzle;
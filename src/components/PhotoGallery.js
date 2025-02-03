// src/components/PhotoGallery.js
import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

function PhotoGallery({ photos }) {
  return (
    <Grid container spacing={3}>
      {photos.map((photo, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Paper
              sx={{
                position: 'relative',
                padding: '10px',
                background: 'white',
                borderRadius: '15px',
                transform: `rotate(${Math.random() * 6 - 3}deg)`,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Box
                component="img"
                src={photo.url}
                alt={photo.caption}
                sx={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'white',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                }}
              >
                {photo.caption}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default PhotoGallery;
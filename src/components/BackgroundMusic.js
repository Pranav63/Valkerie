// src/components/BackgroundMusic.js
import React, { useState, useEffect } from 'react';
import { IconButton, Box } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(true);
  
  useEffect(() => {
    const audio = new Audio('/music/music_val.mp3'); // Add your music file
    audio.loop = true;
    
    if (isPlaying) {
      audio.play();
    }
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={() => setIsPlaying(!isPlaying)}
        sx={{
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(5px)',
          '&:hover': {
            background: 'rgba(255,255,255,0.3)',
          }
        }}
      >
        {isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}
      </IconButton>
    </Box>
  );
}

export default BackgroundMusic;
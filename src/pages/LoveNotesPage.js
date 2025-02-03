// src/pages/LoveNotesPage.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  Zoom
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const loveQuotes = [
  "Every moment with you is a dream come true ✨",
  "You make my heart smile everyday 💖",
  "You're my favorite notification 📱",
  "I love you more than pizza! 🍕",
  "You're my perfect match 💑",
  "Life is better with you by my side 🌟",
  "You're my happy place 🏡",
  "Together is my favorite place to be 💕",
];

const noteCategories = {
  romantic: { icon: <FavoriteIcon />, color: '#FF1493' },
  funny: { icon: <EmojiEmotionsIcon />, color: '#FFA500' },
  memory: { icon: <AutoAwesomeIcon />, color: '#4CAF50' },
  dream: { icon: <BookmarkIcon />, color: '#2196F3' }
};

const noteBackgrounds = {
  pink: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
  purple: 'linear-gradient(135deg, #E6E6FA 0%, #DDA0DD 100%)',
  blue: 'linear-gradient(135deg, #87CEEB 0%, #ADD8E6 100%)',
  yellow: 'linear-gradient(135deg, #FAFAD2 0%, #FFE4B5 100%)'
};

function LoveNotesPage() {
  const [notes, setNotes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    text: '',
    category: 'romantic',
    background: 'pink',
    isPrivate: false
  });
  const [selectedFilter, setSelectedFilter] = useState('all');

  const addCustomNote = () => {
    if (newNote.text.trim()) {
      setNotes([...notes, {
        id: Date.now(),
        ...newNote,
        isLiked: false,
        date: new Date().toISOString(),
      }]);
      setDialogOpen(false);
      setNewNote({
        text: '',
        category: 'romantic',
        background: 'pink',
        isPrivate: false
      });
    }
  };

  const addRandomQuote = () => {
    const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    setNotes([...notes, {
      id: Date.now(),
      text: randomQuote,
      category: 'romantic',
      background: Object.keys(noteBackgrounds)[
        Math.floor(Math.random() * Object.keys(noteBackgrounds).length)
      ],
      isLiked: false,
      date: new Date().toISOString(),
      isPrivate: false
    }]);
  };

  const filteredNotes = selectedFilter === 'all' 
    ? notes 
    : notes.filter(note => note.category === selectedFilter);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%)',
        padding: '40px 20px',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              color: '#FF1493',
              marginBottom: 4,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Digital Love Notes 💌
          </Typography>

          <Grid container spacing={3} marginBottom={4}>
            {Object.entries(noteCategories).map(([key, value]) => (
              <Grid item xs={6} sm={3} key={key}>
                <Paper
                  onClick={() => setSelectedFilter(key)}
                  elevation={selectedFilter === key ? 6 : 1}
                  sx={{
                    padding: '15px',
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    transition: '0.3s',
                    transform: selectedFilter === key ? 'scale(1.05)' : 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  <Box sx={{ color: value.color }}>{value.icon}</Box>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {key}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => setDialogOpen(true)}
              sx={{
                background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                borderRadius: '25px',
                padding: '10px 20px',
              }}
            >
              Write Note
            </Button>
            <Button
              variant="outlined"
              startIcon={<AutoAwesomeIcon />}
              onClick={addRandomQuote}
              sx={{
                borderColor: '#FF1493',
                color: '#FF1493',
                borderRadius: '25px',
                '&:hover': {
                  borderColor: '#FF69B4',
                  background: 'rgba(255,20,147,0.1)',
                }
              }}
            >
              Random Love Quote
            </Button>
          </Box>

          <Grid container spacing={3}>
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <Grid item xs={12} sm={6} key={note.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: noteBackgrounds[note.background],
                        borderRadius: '15px',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                          <Chip
                            icon={noteCategories[note.category].icon}
                            label={note.category}
                            size="small"
                            sx={{
                              backgroundColor: noteCategories[note.category].color,
                              color: 'white'
                            }}
                          />
                          {note.isPrivate && (
                            <Tooltip title="Private note" arrow>
                              <Chip size="small" label="Private" />
                            </Tooltip>
                          )}
                        </Box>
                        <Typography 
                          variant="body1"
                          sx={{ 
                            fontSize: '1.1rem',
                            marginBottom: 2,
                            fontFamily: "'Architects Daughter', cursive"
                          }}
                        >
                          {note.text}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setNotes(notes.map(n => 
                                n.id === note.id ? {...n, isLiked: !n.isLiked} : n
                              ));
                            }}
                          >
                            <FavoriteIcon 
                              sx={{ 
                                color: note.isLiked ? '#FF1493' : 'rgba(0,0,0,0.3)',
                                transition: '0.3s',
                              }} 
                            />
                          </IconButton>
                          <IconButton size="small">
                            <ShareIcon sx={{ color: 'rgba(0,0,0,0.3)' }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setNotes(notes.filter(n => n.id !== note.id));
                            }}
                          >
                            <DeleteIcon sx={{ color: 'rgba(0,0,0,0.3)' }} />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </motion.div>
      </Container>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '15px',
            padding: '10px'
          }
        }}
      >
        <DialogTitle>Write a Love Note</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '300px' }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Message"
              value={newNote.text}
              onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
            />

            <Select
              value={newNote.category}
              onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
              label="Category"
            >
              {Object.entries(noteCategories).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {value.icon}
                    <Typography sx={{ textTransform: 'capitalize' }}>{key}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {Object.entries(noteBackgrounds).map(([key, value]) => (
                <Tooltip key={key} title={key} arrow>
                  <Box
                    onClick={() => setNewNote({ ...newNote, background: key })}
                    sx={{
                      width: 40,
                      height: 40,
                      background: value,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: newNote.background === key ? '2px solid #FF1493' : 'none',
                    }}
                  />
                </Tooltip>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 2 }}>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="contained" 
                onClick={addCustomNote}
                sx={{
                  background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                }}
              >
                Add Note
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default LoveNotesPage;
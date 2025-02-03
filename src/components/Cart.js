// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem,
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
  TextField,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { useGame } from '../context/GameContext';

function Cart({ open, onClose }) {
  const { cart, removeFromCart } = useGame();
  const [activeStep, setActiveStep] = useState(0);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [sending, setSending] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const steps = ['Review Gifts', 'Add Message', 'Send Love'];

  const addHeart = (e) => {
    const heart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setHearts([...hearts, heart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== heart.id));
    }, 1000);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSendLove = async () => {
    setSending(true);
    // Simulate sending process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSending(false);
    setShowConfetti(true);
    handleNext();
    
    setTimeout(() => {
      setShowConfetti(false);
      onClose();
      setActiveStep(0);
      setMessage('');
    }, 5000);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <List>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <ListItem
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '10px',
                      mb: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                    <IconButton 
                      onClick={() => removeFromCart(item.id)} 
                      color="error"
                      sx={{
                        '&:hover': {
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        );
      case 1:
        return (
          <Box sx={{ p: 2 }} onClick={addHeart}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Your Love Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a sweet message for your valentine..."
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#FF1493',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF1493',
                    },
                  },
                }}
              />
              {hearts.map(heart => (
                <motion.div
                  key={heart.id}
                  initial={{ scale: 0, x: heart.x, y: heart.y }}
                  animate={{ scale: 1, y: heart.y - 100 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                  }}
                >
                  <FavoriteIcon sx={{ color: '#FF1493' }} />
                </motion.div>
              ))}
            </motion.div>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {sending ? (
                <CircularProgress sx={{ color: '#FF1493' }} />
              ) : (
                <>
                  <Typography variant="h5" sx={{ mb: 2, color: '#FF1493' }}>
                    🎉 Your Love Package is Ready! 🎉
                  </Typography>
                  <Typography variant="body1">
                    {cart.length} gifts selected with your special message
                  </Typography>
                </>
              )}
            </motion.div>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showConfetti && <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        colors={['#FF1493', '#FF69B4', '#FFB6C1', '#FFF0F5']}
        recycle={false}
      />}
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={onClose}
        PaperProps={{
          sx: {
            width: '350px',
            background: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%)',
            padding: '20px',
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ color: '#FF1493', fontWeight: 'bold' }}>
              Love Cart 💝
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
  
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 3,
              '& .MuiStepIcon-root.Mui-active': {
                color: '#FF1493',
              },
              '& .MuiStepIcon-root.Mui-completed': {
                color: '#FF69B4',
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
  
          <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#FF69B4',
              borderRadius: '4px',
              '&:hover': {
                background: '#FF1493',
              },
            },
          }}>
            {renderStepContent(activeStep)}
          </Box>
  
          <Box sx={{ mt: 'auto', p: 2 }}>
            <Stack direction="row" spacing={2}>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  sx={{
                    flex: 1,
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#FF1493',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.7)',
                      transform: 'scale(1.02)',
                    }
                  }}
                >
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={activeStep === 1 && !message.trim()}
                  sx={{
                    flex: 1,
                    borderRadius: '25px',
                    background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF69B4 30%, #FF1493 90%)',
                      transform: 'scale(1.02)',
                    },
                    '&.Mui-disabled': {
                      background: '#FFB6C1',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSendLove}
                  disabled={sending}
                  sx={{
                    flex: 1,
                    borderRadius: '25px',
                    background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF69B4 30%, #FF1493 90%)',
                      transform: 'scale(1.02)',
                    },
                    '&.Mui-disabled': {
                      background: '#FFB6C1',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }
                  }}
                >
                  {sending ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: 'white' }} />
                      <span>Sending Love...</span>
                    </Box>
                  ) : (
                    'Send Love 💌'
                  )}
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Cart;
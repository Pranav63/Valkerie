// src/pages/WelcomePage.js
import React, { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

function WelcomePage() {
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const floatingHearts = Array(15).fill(null);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Hearts */}
      {floatingHearts.map((_, index) => (
        <motion.div
          key={index}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 20,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <FavoriteIcon
            sx={{
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          />
        </motion.div>
      ))}

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          style={{ width: '100%' }}
        >
          {/* Glowing Circle Background */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
              filter: 'blur(40px)',
              zIndex: -1,
            }}
          />

          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                color: 'white',
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 2,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Valentine Love Cart
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: '1.2rem', md: '1.8rem' },
                mb: 6,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              A magical journey of love awaits you...
            </Typography>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate('/login')}
              sx={{
                display: 'block',
                margin: '0 auto',
                padding: '15px 40px',
                fontSize: '1.2rem',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.9)',
                color: '#FF1493',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: 'rgba(255,255,255,1)',
                  '&::after': {
                    transform: 'scale(1.5)',
                  },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
                  transform: 'scale(0)',
                  transformOrigin: 'center center',
                  transition: 'transform 0.5s ease-out',
                },
              }}
            >
              Begin Our Journey
            </Button>
          </motion.div>

          {/* Decorative Elements */}
          <Box
            component={motion.div}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            sx={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            <FavoriteIcon sx={{ fontSize: '4rem' }} />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default WelcomePage;
// src/pages/WelcomePage.js
import React, { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
// import BackgroundMusic from '../components/BackgroundMusic';

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
  
  const photos = [
    '/puzzle/golu5.jpeg',
    '/puzzle/golu6.jpeg',
    '/puzzle/golu7.jpeg',
    '/puzzle/golu8.jpeg',
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* <BackgroundMusic /> */}

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

      <Container
        maxWidth="md"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          gap: 4,
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
              My entire world - Ms Golu G ❤️
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
              Happy Valentine my first born!...
            </Typography>
          </motion.div>

          {/* Photo Gallery Slider */}
          <motion.div 
            variants={itemVariants}
            style={{ 
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto',
              marginBottom: '2rem',
            }}
          >
            <Swiper
              effect="cube"
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[EffectCube, Autoplay]}
              className="mySwiper"
            >
              {photos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={photo}
                    sx={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '20px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
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
              Begin Valentine Journey
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Sparkle Effect Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: 'url(/sparkles.png)',
          opacity: 0.5,
          animation: 'sparkle 20s linear infinite',
          '@keyframes sparkle': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '100% 100%' },
          },
        }}
      />
    </Box>
  );
}

export default WelcomePage;
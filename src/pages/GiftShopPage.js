// src/pages/GiftShopPage.js
import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  IconButton,
  Badge
} from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useGame } from '../context/GameContext';
import Cart from '../components/Cart';

const gifts = [
  {
    id: 1,
    title: 'Virtual Hug',
    description: 'A warm embrace sent virtually',
    price: '♥️',
    image: '/gifts/virtualhug.jpg',
  },
  {
    id: 2,
    title: 'Video Call Voucher',
    description: '30 minutes of undivided attention',
    price: '♥️♥️',
    image: '/gifts/videocall.jpg',
  },
  {
    id: 3,
    title: 'Love Promise',
    description: 'A special promise just for you',
    price: '♥️♥️♥️',
    image: '/gifts/lovepromise.jpg',
  },
  {
    id: 4,
    title: 'Special Date',
    description: 'A romantic evening together',
    price: '♥️♥️♥️♥️',
    image: '/gifts/specialdate.jpg',
  },
];

function GiftShopPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart } = useGame();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%)',
        padding: { xs: '20px', md: '40px' },
        position: 'relative',
      }}
    >
      {/* Cart Icon */}
      <IconButton
        onClick={() => setCartOpen(true)}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          background: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          '&:hover': {
            background: 'white',
            transform: 'scale(1.1)',
          },
        }}
      >
        <Badge badgeContent={cart.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      {/* Cart Drawer */}
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
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
          Valentine Gift Shop
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          {gifts.map((gift) => (
            <Grid item xs={12} sm={6} md={4} key={gift.id}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={gift.image}
                    alt={gift.title}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                    <Typography variant="h5" component="div" gutterBottom>
                      {gift.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {gift.description}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {gift.price}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => addToCart(gift)}
                      sx={{
                        mt: 2,
                        '&:hover': {
                          transform: 'scale(1.02)',
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}

export default GiftShopPage;
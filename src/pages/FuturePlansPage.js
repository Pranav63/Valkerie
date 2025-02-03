// src/pages/FuturePlansPage.js
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  TextField, 
  Button, 
  List, 
  ListItem,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Grid,
  Tooltip,
  LinearProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function FuturePlansPage() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [category, setCategory] = useState('general');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [priority, setPriority] = useState('medium');
  const [description, setDescription] = useState('');

  const categories = {
    travel: { icon: <FlightTakeoffIcon />, color: '#4CAF50' },
    milestone: { icon: <EmojiEventsIcon />, color: '#FFC107' },
    date: { icon: <RestaurantIcon />, color: '#E91E63' },
    home: { icon: <HomeIcon />, color: '#2196F3' },
    general: { icon: <FavoriteIcon />, color: '#9C27B0' }
  };

  const priorityColors = {
    high: '#f44336',
    medium: '#ff9800',
    low: '#4caf50'
  };

  const handleAddPlan = () => {
    if (newPlan.trim()) {
      const plan = {
        id: Date.now(),
        text: newPlan,
        date: selectedDate,
        category,
        priority,
        description,
        isCompleted: false,
        progress: 0
      };
      setPlans([...plans, plan]);
      resetForm();
      setDialogOpen(false);
    }
  };

  const resetForm = () => {
    setNewPlan('');
    setSelectedDate('');
    setCategory('general');
    setPriority('medium');
    setDescription('');
  };

  const updateProgress = (planId, newProgress) => {
    setPlans(plans.map(plan => 
      plan.id === planId 
        ? { ...plan, progress: newProgress, isCompleted: newProgress === 100 }
        : plan
    ));
  };

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
            Our Future Together ❤️
          </Typography>

          <Grid container spacing={3} marginBottom={4}>
            {Object.entries(categories).map(([key, value]) => (
              <Grid item xs={6} sm={4} md={2.4} key={key}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: '15px',
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '15px',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
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

          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{
              marginBottom: 4,
              background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
              padding: '10px 20px',
              borderRadius: '25px',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
            }}
          >
            Add New Plan
          </Button>

          <List>
            <AnimatePresence>
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      marginBottom: 2,
                      borderRadius: '15px',
                      background: 'rgba(255,255,255,0.9)',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <ListItem
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        padding: '20px'
                      }}
                    >
                      <Box sx={{ display: 'flex', width: '100%', marginBottom: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6">{plan.text}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {plan.description}
                          </Typography>
                        </Box>
                        <IconButton onClick={() => setPlans(plans.filter(p => p.id !== plan.id))}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>

                      <Box sx={{ width: '100%', marginBottom: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={plan.progress} 
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: priorityColors[plan.priority]
                            }
                          }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={categories[plan.category].icon}
                          label={plan.category}
                          size="small"
                          sx={{ backgroundColor: categories[plan.category].color, color: 'white' }}
                        />
                        {plan.date && (
                          <Chip
                            icon={<CalendarTodayIcon />}
                            label={plan.date}
                            size="small"
                            variant="outlined"
                          />
                        )}
                        <Chip
                          label={`Priority: ${plan.priority}`}
                          size="small"
                          sx={{ backgroundColor: priorityColors[plan.priority], color: 'white' }}
                        />
                      </Box>
                    </ListItem>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
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
        <DialogTitle>Add New Plan</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '300px' }}>
            <TextField
              fullWidth
              label="Plan Title"
              value={newPlan}
              onChange={(e) => setNewPlan(e.target.value)}
            />
            
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              type="date"
              label="Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {Object.keys(categories).map(cat => (
                <MenuItem key={cat} value={cat}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {categories[cat].icon}
                    <Typography sx={{ textTransform: 'capitalize' }}>{cat}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>

            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="high">High Priority</MenuItem>
              <MenuItem value="medium">Medium Priority</MenuItem>
              <MenuItem value="low">Low Priority</MenuItem>
            </Select>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 2 }}>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="contained" 
                onClick={handleAddPlan}
                sx={{
                  background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                }}
              >
                Add Plan
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default FuturePlansPage;
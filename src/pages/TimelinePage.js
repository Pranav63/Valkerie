// src/pages/TimelinePage.js
import React from 'react';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const memories = [
  {
    date: 'First Meeting',
    description: 'The day we first met',
    image: '/timeline/firstmeet.jpeg'
  },
  {
    date: 'First Date',
    description: 'Our magical first date',
    image: '/timeline/firstdate.jpeg'
  },
  {
    date: 'First Kiss',
    description: 'A moment to remember',
    image: '/timeline/firstkiss.jpeg'
  },
  // Add more memories here
];

function TimelinePage() {
  const navigate = useNavigate();

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              color: '#FF1493',
              marginBottom: 6,
              fontWeight: 'bold',
            }}
          >
            Our Love Story ❤️
          </Typography>

          <Timeline position="alternate">
            {memories.map((memory, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot sx={{ bgcolor: '#FF1493' }} />
                  {index < memories.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        padding: '20px',
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      <Typography variant="h6" color="#FF1493">
                        {memory.date}
                      </Typography>
                      <Box
                        component="img"
                        src={memory.image}
                        alt={memory.date}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: '10px',
                          marginY: 2,
                        }}
                      />
                      <Typography>{memory.description}</Typography>
                    </Paper>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </Container>
    </Box>
  );
}

export default TimelinePage;
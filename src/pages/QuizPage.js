// src/pages/QuizPage.js
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Container, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    question: "What's my favorite food?",
    options: ["Pizza", "Sushi", "Tacos", "Pasta"],
    correctAnswer: "Tacos"
  },
  {
    question: "Where was our first date?",
    options: ["Park", "Restaurant", "Movies", "Beach"],
    correctAnswer: "Restaurant"
  },
  {
    question: "What's our song?",
    options: ["Perfect", "All of Me", "At Last", "Can't Help Falling in Love"],
    correctAnswer: "Perfect"
  },
  // Add more questions
];

function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResults(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%)',
        padding: '40px 20px',
      }}
    >
      <Container maxWidth="sm">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: '40px',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <Typography variant="h4" sx={{ color: '#FF1493', marginBottom: 4, textAlign: 'center' }}>
                  Question {currentQuestion + 1}/{questions.length}
                </Typography>

                <Typography variant="h6" sx={{ marginBottom: 3 }}>
                  {questions[currentQuestion].question}
                </Typography>

                <FormControl component="fieldset">
                  <RadioGroup
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  >
                    {questions[currentQuestion].options.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAnswer}
                  disabled={!selectedAnswer}
                  sx={{
                    marginTop: 4,
                    borderRadius: '25px',
                    background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                  }}
                >
                  Next
                </Button>
              </Paper>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: '40px',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" sx={{ color: '#FF1493', marginBottom: 4 }}>
                  Quiz Complete! 🎉
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 3 }}>
                  You scored: {score}/{questions.length}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 4 }}>
                  {score === questions.length 
                    ? "Perfect! You know me so well! ❤️" 
                    : "Keep learning about me! 💕"}
                </Typography>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default QuizPage;
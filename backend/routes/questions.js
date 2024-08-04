const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // Correct import of the model

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new question
router.post('/', async (req, res) => {
  const question = new Question({
    question: req.body.question,
    answer: req.body.answer,
    keywords: req.body.keywords
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

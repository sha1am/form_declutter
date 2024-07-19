const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // To parse JSON data

// Define a schema and model for questions
const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  keywords: [String]
});

const Question = mongoose.model('Question', questionSchema);

// POST endpoint to add a new question
app.post('/api/questions', async (req, res) => {
  try {
    const { question, answer, keywords } = req.body;
    const newQuestion = new Question({ question, answer, keywords });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion); // Respond with the saved question
  } catch (err) {
    res.status(400).json({ message: 'Error adding question', error: err });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

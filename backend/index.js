require('dotenv').config(); 

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

//Can shift these thigns to .env file. ( Q: Can there be more than 1 env file?)


const { DB_USERNAME, DB_PASSWORD } = process.env;
// console.log(`DB_USERNAME : ${DB_USERNAME}`);
// console.log(`DB_PASSWORD : ${DB_PASSWORD}`);

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@form-declutter-cluster.hmkf843.mongodb.net/qa_db?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

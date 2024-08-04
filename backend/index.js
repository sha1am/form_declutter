require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;
const questionsRoutes = require('./routes/questions');

// Configure CORS to allow requests from your Netlify domain
const corsOptions = {
  origin: 'https://formdeclutter.netlify.app',
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(express.json()); // To parse JSON data
app.use(cors(corsOptions));
app.use('/api/questions', questionsRoutes); // Use the correct route prefix

// Move the model definition to `models/Question.js` and require it in `routes/questions.js`

const { DB_USERNAME, DB_PASSWORD } = process.env;
const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@form-declutter-cluster.hmkf843.mongodb.net/qa_db?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => console.log(`Server running on port ${port}`));

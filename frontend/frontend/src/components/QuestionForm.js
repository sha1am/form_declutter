import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      answer,
      keywords: keywords.split(',').map(k => k.trim())
    };

    axios.post('https://form-declutter-be.onrender.com/api/questions', newQuestion)
      .then(res => {
        console.log('Record added/updated:', res.data); // Log the response data
        // Clear form fields
        setQuestion('');
        setAnswer('');
        setKeywords('');
      })
      .catch(err => console.log('Error adding/updating record:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={e => setQuestion(e.target.value)} 
        required
      />
      <textarea
        placeholder="Answer"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Keywords (comma separated)"
        value={keywords}
        onChange={e => setKeywords(e.target.value)}
      />
      <button type="submit">Add Question</button>
    </form>
  );
};

export default QuestionForm;

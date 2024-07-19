import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  // Filter questions based on search term
  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredQuestions.map(q => (
          <li key={q._id}>
            <strong>{q.question}</strong>
            <button onClick={() => copyToClipboard(q.answer)}>Copy</button>
            <button onClick={() => alert(q.answer)}>See Answer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;

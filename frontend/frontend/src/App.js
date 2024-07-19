import './App.css';

import React from 'react';
import QuestionList from './components/QuestionList.js';
import QuestionForm from './components/QuestionForm.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Form Declutter </h1>
      </header>
      <QuestionForm />
      <QuestionList />

    </div>
  );
}

export default App;

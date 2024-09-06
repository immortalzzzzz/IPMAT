import React, { useState } from 'react';
import '../styles/Question.css';

const Question = ({ quesno, ques, options, typeques, typeoptions, selectedOption, onOptionChange }) => {
  

  const handleOptionChange = (index) => {
    onOptionChange(index);
  };

  return (
    <div className='question-container'>
      <h2>Question {quesno}:</h2>
      {typeques === 'text' ? (
        <p>{ques}</p>
      ) : (
        <img src={ques} alt={`Question ${quesno}`} />
      )}
      <form>
        {options.map((option, index) => (
          <div className='options' key={index}>
            <div className='option'>
              <input
                type="radio"
                id={`option${index}`}
                name={`question${quesno}`}
                checked={selectedOption === index}
                onChange={() => handleOptionChange(index)} // Passing index to handleOptionChange
              />
              <label htmlFor={`option${index}`}>
                {typeoptions === 'text' ? (
                  <span>{option}</span>
                ) : (
                  <img src={option} draggable="false" alt={`Option ${index}`} />
                )}
              </label>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Question;

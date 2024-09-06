import React from 'react';
import '../styles/Result.css';

const Result = ({ right, wrong, unattempted }) => {
  const total = right + wrong + unattempted;
  const percentage = ((right / total) * 100).toFixed(2);

  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      <div className="result-item">
        <span>Total Questions:</span>
        <span>{total}</span>
      </div>
      <div className="result-item">
        <span>Correct Answers:</span>
        <span>{right}</span>
      </div>
      <div className="result-item">
        <span>Wrong Answers:</span>
        <span>{wrong}</span>
      </div>
      <div className="result-item">
        <span>Unattempted Questions:</span>
        <span>{unattempted}</span>
      </div>
      <div className="result-item">
        <span>Percentage:</span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

export default Result;

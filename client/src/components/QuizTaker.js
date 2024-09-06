// QuizTaker.js
import React, { useEffect, useRef, useState } from 'react';
import Quiz from './Quiz';
import { useParams } from 'react-router-dom';
import Result from './Result';

const QuizTaker = () => {
  const right = useRef(0);
  const wrong = useRef(0);
  const unattempted = useRef(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState(null);
  const { quizId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/quiz/${quizId}`)
      .then((response) => response.json())
      .then((qdata) => setAnswers(qdata.data.answers))
      .catch((error) => console.error('Error fetching quiz:', error));
  }, [quizId]);

  const onSubmit = (submittedValues) => {
    submittedValues.forEach((element, ind) => {
      if (element === answers[ind]) {
        right.current++;
      } else if (element === null) {
        unattempted.current++;
      } else {
        wrong.current++;
      }
    });
    setShowResult(true);
  };

  return (
    <div>
      {showResult ? (
        <Result right={right.current} wrong={wrong.current} unattempted={unattempted.current} />
      ) : (
        <Quiz onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default QuizTaker;

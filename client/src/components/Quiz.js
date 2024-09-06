import React, { useEffect, useState } from 'react';
import Question from './Question';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Quiz.css';

const Quiz = ({ onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { quizId } = useParams();
  const navigate = useNavigate();

  const quizzesData = useSelector(state => state.quizzesData);
  const userData = useSelector(state => state.userData);


  useEffect(() => {

    const isFreeQuiz = quizzesData.freeQuizzes.some(quiz => quiz.id == quizId);
    console.log(userData.purchases.quizzes);
    const isPurchasedQuiz = userData.purchases.quizzes.some(id => quizId==id);

    if (!isFreeQuiz && !isPurchasedQuiz) {
      navigate('/');
      return;
    }

    fetch(`http://localhost:3000/api/quiz/${quizId}`)
      .then((response) => response.json())
      .then((qdata) => {
        setQuizData(qdata.data.questions);
        setSelectedOptions(Array(qdata.data.questions.length).fill(null));
      })
      .catch((error) => console.error('Error fetching quiz:', error));
  }, [quizId, quizzesData.freeQuizzes, userData.purchases.quizzes, navigate]);

  const handleOptionChange = (questionIndex, option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    onSubmit(selectedOptions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="quiz-container">
      {quizData && (
        <>
          <Question
            quesno={quizData[currentQuestionIndex].quesno}
            ques={quizData[currentQuestionIndex].ques}
            options={quizData[currentQuestionIndex].options}
            typeques={quizData[currentQuestionIndex].typeques}
            typeoptions={quizData[currentQuestionIndex].typeoptions}
            selectedOption={selectedOptions[currentQuestionIndex]}
            onOptionChange={(option) => handleOptionChange(currentQuestionIndex, option)}
          />
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button onClick={handleNext} hidden={currentQuestionIndex === quizData.length - 1}>
              Next
            </button>
            <button onClick={handleSubmit} hidden={!(currentQuestionIndex === quizData.length - 1)}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizzesData } from '../redux/quizzesDataSlice';
import Loading from './Loading';
import '../styles/QuizList.css'; 

const QuizList = () => {
    const dispatch = useDispatch();
    const quizzesData = useSelector(state => state.quizzesData);
    const userData = useSelector(state => state.userData);

    useEffect(() => {
        if (quizzesData.status === 'idle') {
            dispatch(fetchQuizzesData());
        }
    }, [quizzesData.status, dispatch]);

    if (quizzesData.status === 'loading') {
        return <Loading />;
    }

    if (quizzesData.status === 'failed') {
        return <div>Error: {quizzesData.error}</div>;
    }

    const quizzes = [
        ...quizzesData.freeQuizzes,
        ...quizzesData.paidQuizzes.filter(quiz => userData.purchases.quizzes.includes(quiz.id))
    ];

    return (
        <div className="quiz-list-container">
            <h2>All Quizzes</h2>
            <ul className="quiz-list">
                {quizzes.map((quiz) => (
                    <li key={quiz.id} className="quiz-item">
                        <Link to={`/quiz/${quiz.id}`} className="quiz-link">
                            <div className="quiz-info">
                                <div className="quiz-title">{quiz.title}</div>
                                <div className="quiz-details">
                                    <span>{quiz.data.questions.length} questions</span> 
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;

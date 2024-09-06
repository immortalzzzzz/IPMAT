import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/QuizList.css'; 
import Loading from './Loading';
import { fetchNotesData } from '../redux/notesDataSlice';

const NotesList = () => {
  const dispatch = useDispatch();
  const notesData = useSelector(state => state.notesData);
  const userData = useSelector(state => state.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (notesData.status === 'idle') {
      dispatch(fetchNotesData());
    }
    setLoading(false);
  }, [notesData.status, dispatch]);

  if (loading || notesData.status === 'loading') {
    return <Loading currentlyHidden={loading} />;
  }

  if (notesData.status === 'failed') {
    return <div>Error: {notesData.error}</div>;
  }

  const notes = notesData.freeNotes.concat(
    notesData.paidNotes.filter(note => userData.purchases.notes.includes(note.id))
  );

  return (
    <div className="quiz-list-container">
      <h2>All Notes</h2>
      <ul className="quiz-list">
        {notes.map((note) => (
          <li key={note.id} className="quiz-item">
            <Link to={`/notes/${note.id}`} className="quiz-link">
              <div className="quiz-info">
                <div className="quiz-title">{note.title}</div>
                <div className="quiz-details">
                  <span>{note.numberOfPages} {note.numberOfPages !== 1 ? "pages" : "page"}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;

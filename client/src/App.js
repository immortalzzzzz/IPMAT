
import './App.css';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Routes,Navigate } from 'react-router-dom';
import Slider from './components/Slider.js';
import Launches from './components/Launches.js';
import QuizTaker from './components/QuizTaker.js';
import QuizList from './components/QuizList.js';
import Notes from './components/Notes.js';
import NotesList from './components/NotesList.js'
import Account from './components/Account.js'
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import {Provider} from 'react-redux'
import {store} from './redux/store.js'
import AccountPage from './components/AccountPage.js';
import Package from './components/Package.js';
import Home from './components/Home.js'

function App() {
  return (  
    <Provider store={store}>
    <Router>
      <Navbar/>
      <Routes>  
      <Route exact path='/' element={
        <Home/>
      }/>
      <Route path="/notes/:noteId" element= {<Notes/>}/>
      <Route exact path="/notes" element={<NotesList/>}/>
      <Route exact path="/quiz" element={<QuizList/>}/>
      <Route path="quiz/:quizId" element={<QuizTaker/>}/>
      <Route exact path="/account" element={<AccountPage/>}/>
      <Route path="account/signup" element={<Signup />} />
      <Route path="account/login" element={<Login />} />
      <Route path="packages" element={<Package title="Boom Boom PAckage"  description="However, it's important to remember that Michael's actions are the culmination of careful planning and strategic thinking. While it may appear sudden, the groundwork for this resolution is laid throughout the film, as Michael observes and learns from his father's methods and the strategies employed by his enemies."
        imageLink= "https://picsum.photos/200" cost="1"  quizIds={[1,2]}  notesIds={[]}  lectureIds={[]} liveIds={[]}/>} />
      <Route path="packages/:packageId" element={<Package/>}/>
      <Route path="/*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
    </Provider>
  );
}

export default App;

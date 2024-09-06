import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './userDataSlice.js'
import notesDataReducer from './notesDataSlice.js';
import liveDataReducer from './liveDataSlice.js';
import quizzesDataReducer from './quizzesDataSlice.js';
import lecturesDataReducer from './lecturesDataSlice.js';
import packagesDataReducer from './packagesDataSlice.js';

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        notesData: notesDataReducer,
        quizzesData: quizzesDataReducer,
        lecturesData: lecturesDataReducer,
        liveData: liveDataReducer,
        packagesData: packagesDataReducer
    }
});
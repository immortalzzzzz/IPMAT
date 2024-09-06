import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    freeQuizzes: [],
    paidQuizzes: [],
    status: 'idle', 
    error: null
};

export const fetchQuizzesData = createAsyncThunk('quizzesData/fetchQuizzesData', async () => {
    const response = await fetch('http://localhost:5000/api/quizzes');
    const data = await response.json();


    const freeQuizzes = data.filter(quiz => quiz.type === 'Free');
    const paidQuizzes = data.filter(quiz => quiz.type === 'Paid');

    return { freeQuizzes, paidQuizzes };
});

const quizzesDataSlice = createSlice({
    name: 'quizzesData',
    initialState,
    reducers: {
        updateQuizzesData: (state, action) => {
            state.freeQuizzes = action.payload.freeQuizzes;
            state.paidQuizzes = action.payload.paidQuizzes;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizzesData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuizzesData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.freeQuizzes = action.payload.freeQuizzes;
                state.paidQuizzes = action.payload.paidQuizzes;
            })
            .addCase(fetchQuizzesData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { updateQuizzesData } = quizzesDataSlice.actions;
export default quizzesDataSlice.reducer;

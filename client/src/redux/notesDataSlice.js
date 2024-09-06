import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    freeNotes: [],
    paidNotes: [],
    status: 'idle', 
    error: null
};


export const fetchNotesData = createAsyncThunk('notesData/fetchNotesData', async () => {
    const response = await fetch('http://localhost:5000/api/notes');
    const data = await response.json();


    const freeNotes = data.filter(note => note.type === 'Free');
    const paidNotes = data.filter(note => note.type === 'Paid');

    return { freeNotes, paidNotes };
});

const notesDataSlice = createSlice({
    name: 'notesData',
    initialState,
    reducers: {
        updateNotesData: (state, action) => {
            state.freeNotes = action.payload.freeNotes;
            state.paidNotes = action.payload.paidNotes;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotesData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotesData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.freeNotes = action.payload.freeNotes;
                state.paidNotes = action.payload.paidNotes;
            })
            .addCase(fetchNotesData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { updateNotesData } = notesDataSlice.actions;
export default notesDataSlice.reducer;

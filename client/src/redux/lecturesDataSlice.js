import {createSlice} from "@reduxjs/toolkit"
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
    freeLectures: [],
    paidLectures: [],
};



const lecturesData = createSlice({
    name: 'lecturesData',
    initialState: initialState,
    reducers:{
        updateLecturesData:(state,action)=>{
            state.freeLectures=action.payload.freeLectures;
            state.paidLectures=action.payload.paidLectures;
        }
    }
})


export const getLecturesData = createSelector(
    (state)=>(state.lecturesData),
    (state)=>state
)

export const { updateLecturesData } = lecturesData.actions; 

export default lecturesData.reducer;
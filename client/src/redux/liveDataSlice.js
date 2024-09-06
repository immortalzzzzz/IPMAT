import {createSlice} from "@reduxjs/toolkit"
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
    freeLive: [],
    paidLive: [],
};



const liveData = createSlice({
    name: 'liveData',
    initialState: initialState,
    reducers:{
        updateLiveData:(state,action)=>{
            state.freeLive=action.payload.freeLive;
            state.paidLive=action.payload.paidLive;
        }
    }
})


export const getLiveData = createSelector(
    (state)=>(state.liveData),
    (state)=>state
)

export const { updateLiveData } = liveData.actions; 

export default liveData.reducer;
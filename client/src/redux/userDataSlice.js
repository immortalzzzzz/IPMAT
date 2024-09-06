import {createSlice} from "@reduxjs/toolkit"
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
    username: "Guest",
    loggedIn: false,
    email: "",
    purchases: { lectures: [], notes: [], quizzes: [] }
};



const userData = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers:{
        login:(state,action)=>{
            state.username=action.payload.name;
            state.loggedIn=true;
            state.email=action.payload.email;
            state.purchases= action.payload.purchases;
            state.progress = action.payload.progress;}
        ,
        logout:(state,action)=>{
            state.username = initialState.username;
            state.loggedIn = initialState.loggedIn;
            state.email = initialState.email;
            state.purchases = initialState.purchases;
            state.progress = initialState.progress;
        },
        updateUserData:(state,action)=>{
            state.username=action.payload.name;
            state.loggedIn=true;
            state.email=action.payload.email;
            state.purchases= action.payload.purchases;
            state.progress = action.payload.progress;;
        }
    }
})


export const getUserData = createSelector(
    (state)=>(state.userData),
    (state)=>state
)

export const { login, logout,updateUserData } = userData.actions; 
export default userData.reducer;
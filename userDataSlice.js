import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
  username: 'Guest',
  loggedIn: false,
  email: '',
  purchases: { lectures: [], notes: [], quizzes: [], lives: [] }, // added lives
  progress: { lectures: [], notes: [], quizzes: [] }
};

// Thunk to check for user data in cookies
export const checkUserFromCookies = createAsyncThunk(
  'userData/checkUserFromCookies',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');  // Use the correct cookie name

      if (token) {
        // Make request to get user data
        const response = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data.userData;  // Adjust based on your response structure
      }

      return null;  // No token found
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.name;
      state.loggedIn = true;
      state.email = action.payload.email;
      state.purchases = action.payload.purchases;
      state.progress = action.payload.progress;
    },
    logout: (state) => {
      state.username = initialState.username;
      state.loggedIn = initialState.loggedIn;
      state.email = initialState.email;
      state.purchases = initialState.purchases;
      state.progress = initialState.progress;
    },
    updateUserData: (state, action) => {
        state.username = action.payload.name;
        state.loggedIn = true;
        state.email = action.payload.email;
        state.purchases = action.payload.purchases;
        state.progress = action.payload.progress;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserFromCookies.fulfilled, (state, action) => {
        if (action.payload) {
          state.username = action.payload.name;
          state.loggedIn = true;
          state.email = action.payload.email;
          state.purchases = action.payload.purchases;
          state.progress = action.payload.progress;
        }
      })
      .addCase(checkUserFromCookies.rejected, (state, action) => {
        // Reset the state if the token is invalid
        Cookies.remove('token');  // Clear the token cookie if there's an error
        state.username = 'Guest';
        state.loggedIn = false;
        state.email = '';
        state.purchases = { lectures: [], notes: [], quizzes: [], lives: [] };
        state.progress = { lectures: [], notes: [], quizzes: [] };
      });
  }
});

export const { login, logout ,updateUserData} = userDataSlice.actions;
export const getUserData = (state) => state.userData;
export default userDataSlice.reducer;
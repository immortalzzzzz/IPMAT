import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPackages = createAsyncThunk('packages/fetchPackages', async () => {
  const response = await axios.get('/api/packages');
  return response.data;
});

const packagesDataSlice = createSlice({
  name: 'packagesData',
  initialState: {
    packages: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default packagesDataSlice.reducer;

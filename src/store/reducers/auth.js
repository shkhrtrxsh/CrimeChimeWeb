import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../api/auth'

const initialState = {
    user: null,
    _token: null,
    error: "",
    loading: false,
}

export const auth = createSlice({
    name: 'auth',
    initialState ,
    extraReducers: {
        // Login Api
        [login.pending]: (state, action) => {
          state.loading = true;
          console.log('pending')
        },
        [login.fulfilled]: (state, action) => {
          state.loading = false;
          localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
          localStorage.setItem("_token", action.payload.access_token);
          state.user = action.payload;
          console.log('fulfilled')
        },
        [login.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
          console.log('rejected')
        },

        // Register API
        [register.pending]: (state, action) => {
          state.loading = true;
          console.log('pending')
        },
        [register.fulfilled]: (state, action) => {
          state.loading = false;
          localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
          localStorage.setItem("_token", action.payload.access_token);
          state.user = action.payload;
          console.log('fulfilled')
        },
        [register.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
          console.log('rejected')
        },
    }
})

export default auth.reducer;
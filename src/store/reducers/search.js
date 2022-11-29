import { createSlice } from '@reduxjs/toolkit';
import { 
  searchLocation, 
  getRoles, 
  roleStatus, 
  deleteRole, 
  showRole, 
  editRole
} from '../api/role'

const initialState = {
    search_location: null,
    search_country: null,
    search_state: null,
    search_city: null,
    error: "",
    loading: false,
}

export const role = createSlice({
    name: 'role',
    initialState ,
    extraReducers: {
        // Role Add Api
        [searchLocation.pending]: (state, action) => {
          state.loading = true;
        },
        [searchLocation.fulfilled]: (state, action) => {
          state.loading = false;
          state.search_location = action.payload;
        },
        [searchLocation.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },   
        
    }
})

export default role.reducer;
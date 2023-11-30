import { createSlice } from '@reduxjs/toolkit';
import { 
  listIndustryType
} from '../api/corporate'

const initialState = {
 
  industryTypes: [],
};


export const industrytypelist = createSlice({
  name: 'industrytypelist',
  initialState,
  reducers: {
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(listIndustryType.fulfilled, (state, action) => {
        state.industryTypes = action.payload; // Update the industryTypes with the processed data
      })
      .addCase(listIndustryType.rejected, (state, action) => {
        // Handle rejection if needed
      });
  },
});

export default industrytypelist.reducer;



// const initialState = {
//     users: {
//         data : null,
//         total : 1,
//         per_page : 1,
//         current_page : 1
//     },
//     user: null,
//     error: "",
//     loading: false,
// }

// export const user = createSlice({
//     name: 'user',
//     initialState ,
//     extraReducers: {
//         // User Add Api
//         [addUser.pending]: (state, action) => {
//           state.loading = true;
//         },
//         [addUser.fulfilled]: (state, action) => {
//           state.loading = false;
//           state.user = action.payload;
//         },
//         [addUser.rejected]: (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         },

//         // Get User Api
//         [getUsers.pending]: (state, action) => {
//           state.loading = true;
//         },
//         [getUsers.fulfilled]: (state, action) => {
//           state.loading = false;
//           state.users = action.payload;
//         },
//         [getUsers.rejected]: (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         },

//         // Show User Api
//         [showUser.pending]: (state, action) => {
//           state.loading = true;
//         },
//         [showUser.fulfilled]: (state, action) => {
//           state.loading = false;
//           state.user = action.payload.data;
//         },
//         [showUser.rejected]: (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         },

//         // Show User Api
//         [showAuthUser.pending]: (state, action) => {
//           state.loading = true;
//         },
//         [showAuthUser.fulfilled]: (state, action) => {
//           state.loading = false;
//           state.user = action.payload.data;
//         },
//         [showAuthUser.rejected]: (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         },

//         // Edit User Api
//         [editUser.pending]: (state, action) => {
//           state.loading = true;
//         },
//         [editUser.fulfilled]: (state, action) => {
//           state.loading = false;
//           // state.user = action.payload.data;
//         },
//         [editUser.rejected]: (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         },

//         // Change User Status Api
//         [userStatus.pending]: (state, action) => {
//           state.loading = true;
//         },
//         [userStatus.fulfilled]: (state, action) => {
//           state.loading = false;
//           state.users.data.forEach((user, index) => {
//             if(user.id === action.payload.data.id){
//               state.users.data[index].status = action.payload.data.status;
//             }
//           })
//         },
//         [userStatus.rejected]: (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         },

//         // Delete User Api
//         [deleteUser.pending]: (state, action) => {
//           state.loading = true;
//         },
//         [deleteUser.fulfilled]: (state, action) => {
//           state.loading = false;
//           state.users.data.forEach((user, index) => {
//             if(user.id === action.payload.data.id){
//               state.users.data.splice(index, 1)
//             }
//           })
//         },
//         [deleteUser.rejected]: (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         },


//         //dashboard Api
//         [dashboard.pending]: (state, action) => {
//           state.loading = true;
//         },
//         [dashboard.fulfilled]: (state, action) => {
//           state.loading = false;
//           state.user = action.payload.data;
//         },
//         [dashboard.rejected]: (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         },
        
//     }
// })

// export default user.reducer;
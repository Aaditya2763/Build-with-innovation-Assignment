import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersAction, getUserProfileAction } from "../actions/getUsersAction";

const userDataFromLoacalStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

console.log(userDataFromLoacalStorage)
const userSlice = createSlice({
    name: "users",
   
    initialState: {
        users:"",
    userProfile:"",
     userAuth:userDataFromLoacalStorage,
     registered:"false",
    
    },
  
    extraReducers: (builder) => {
  
      //get all data 
      builder.addCase(getAllUsersAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload
        // console.log(payload)
      });
      builder.addCase(getAllUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });


  //get Userdetails
   builder.addCase(getUserProfileAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action?.payload
        // console.log(payload)
      });
      builder.addCase(getUserProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
     
    },
    
  });
  
  
  
  
  export default userSlice.reducer;
  
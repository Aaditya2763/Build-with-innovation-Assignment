
import { createSlice } from "@reduxjs/toolkit";
import { loginUserAction, logoutAction, registerUserAction } from "../actions/authActions";

const userDataFromLoacalStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null;

const authSlice = createSlice({
  name: "auth",
 
  initialState: {
  
   userAuth:userDataFromLoacalStorage,
   registered:"false",
    
  },

  extraReducers: (builder) => {

    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login
    builder.addCase(loginUserAction.pending,(state,action)=>{
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.registered=false;
      state.userAuth=action?.payload;
      state.loading = false;
      state.appErr=undefined;
      state.serverErr=undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
     
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
//logoutAction

    builder.addCase(logoutAction.pending,(state,action)=>{
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth=undefined
      state.loading = false;
      state.appErr=undefined;
      state.serverErr=undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
     
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
  
 
});



export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;

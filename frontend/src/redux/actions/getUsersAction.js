import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";


//getting all users
export const getAllUsersAction = createAsyncThunk(
    //1st arguement action type(any name)
    //user as payload and
    "/users",
    async ( users,{ rejectWithValue, getState, dispatch }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.get(
          `${baseUrl}/users`,
          
          config
        );
        return res.data;
        console.log(res.data)
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  export const getUserProfileAction = createAsyncThunk(
    //1st arguement action type(any name)
    //user as payload and
    "/getUser",
   
    async (id,{ rejectWithValue, getState, dispatch }) => {
        const {userAuth}=getState()?.auth;
        const token=userAuth.token;
  
      try {

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`,
          },
        };
        const res = await axios.get(
          `${baseUrl}/users/profile/${id}`,
          config
        );
        // console.log(res.data)
        return res.data;
        
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
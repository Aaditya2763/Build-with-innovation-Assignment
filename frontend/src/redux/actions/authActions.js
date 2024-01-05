import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

//register action
export const registerUserAction = createAsyncThunk(
    //1st arguement action type(any name)
    //user as payload and
    "user/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.post(
          `${baseUrl}/register`,
          user,
          config
        );
        return res.data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  

  //login action
export const loginUserAction = createAsyncThunk(
    //1st arguement action type(any name) and //user as payload and
    
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
      try {
       
        const res = await axios.post(
          `${baseUrl}/login`,
          userData,
          config
        );
        //save reponse too local storage
        localStorage.setItem("userInfo",JSON.stringify(res.data))
        return res.data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }

 
    

  );


     ///logout Action
     export const logoutAction = createAsyncThunk(
        '/logout',
        async (payload, { rejectWithValue, getState, dispatch }) => {
          try {
            localStorage.removeItem("userInfo");
            // Additional logic or API calls can be added here if needed
          } catch (error) {
            if (!error?.response) {
              throw error;
            }
            return rejectWithValue(error?.response?.data);
          }
        }
      );
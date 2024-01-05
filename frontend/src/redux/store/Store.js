import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import usersSlice from '../slices/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer ,
    Users:usersSlice
  },
});

export default store;

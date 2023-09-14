import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Update the path

const store = configureStore({
  reducer: {
    auth: authReducer, // Include the authReducer
  },
});

export default store;

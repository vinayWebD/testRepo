import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    auth: authReducer, // Include the authReducer
  },
  middleware: [thunk],
});

export default store;

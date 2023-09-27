import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import thunk from 'redux-thunk';
import appSearchSlice from './slices/appSearchSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    appSearch: appSearchSlice,
  },
  middleware: [thunk],
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import totalPurchReducer from './storeDataSlice';

export const store = configureStore({
  reducer: {
    storeData: totalPurchReducer,
  },
});
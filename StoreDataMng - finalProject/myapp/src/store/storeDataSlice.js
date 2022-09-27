import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
  products: [],
  purchases: []
};

export const storeDataSlice = createSlice({
  name: 'storeData', 
  initialState,
  reducers: {
    
    init: (state,action) => {
      state.customers =  action.payload.customers
      state.products =  action.payload.products
      state.purchases =  action.payload.purchases
    }, 
  },
});

export const { init } = storeDataSlice.actions;

export default storeDataSlice.reducer;

// reference: https://redux.js.org/tutorials/quick-start
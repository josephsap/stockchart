import { createSlice } from '@reduxjs/toolkit';

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: [],

  // a listener from an action
  reducers: {
    setPortfolio: (state, action) => action.payload,
    sellAllSharesOfStock: (state, action) => {
      return state.filter((stock) => stock.id !== action.payload.id);
    },
  },
});

export const selectPortfolio = (state) => state.portfolio;

export const { setPortfolio, sellAllSharesOfStock } = portfolioSlice.actions;

export default portfolioSlice.reducer;

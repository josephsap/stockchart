import { createSlice } from '@reduxjs/toolkit';

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: [],

  // a listener from an action
  reducers: {
    setPortfolio: (state, action) => action.payload,
  },
});

export const selectPortfolio = (state) => state.portfolio;

export const { setPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;

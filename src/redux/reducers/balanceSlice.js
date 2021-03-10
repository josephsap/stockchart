import { createSlice } from '@reduxjs/toolkit';

export const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    value: 100000,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { decrementByAmount, incrementByAmount } = balanceSlice.actions;

export default balanceSlice.reducer;

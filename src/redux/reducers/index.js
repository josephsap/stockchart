import { combineReducers } from '@reduxjs/toolkit';

import balanceReducer from './balanceSlice';
import portfolioReducer from './portfolioSlice';

export default combineReducers({
  balance: balanceReducer,
  portfolio: portfolioReducer,
});

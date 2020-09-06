import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './todoSlice';

export const TodosStore = configureStore({
  reducer: todoSlice.reducer,
});

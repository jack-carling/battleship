import { configureStore } from '@reduxjs/toolkit';

import boardReducer from '../features/boardSlice';
import dragReducer from '../features/dragSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    drag: dragReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

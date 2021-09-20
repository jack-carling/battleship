import { configureStore } from '@reduxjs/toolkit';

import boardReducer from '../features/boardSlice';
import gameReducer from '../features/gameSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

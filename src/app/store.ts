import { configureStore } from '@reduxjs/toolkit';

import boardReducer from '../features/boardSlice';
import enemyBoardReducer from '../features/enemyBoardSlice';
import gameReducer from '../features/gameSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    enemyBoard: enemyBoardReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

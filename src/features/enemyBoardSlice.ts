import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EnemyBoardState, EnemyBoard } from '../app/interfaces';

const board: EnemyBoard[] = [];

for (let i = 0; i < 100; i++) {
  board.push({ index: i, ship: false, click: false });
}

const initialState = { board, enemyCount: 0 } as EnemyBoardState;

const enemyBoardSlice = createSlice({
  name: 'enemyBoard',
  initialState,
  reducers: {
    setShips: (state, action: PayloadAction<number[]>) => {
      const board = [...state.board];
      action.payload.forEach((index) => {
        board[index].ship = true;
      });
      state.board = [...board];
    },
    setClick: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.board[index].click = true;
    },
    incrementCount: (state) => {
      state.enemyCount++;
    },
  },
});

export const { setShips, setClick, incrementCount } = enemyBoardSlice.actions;
export default enemyBoardSlice.reducer;

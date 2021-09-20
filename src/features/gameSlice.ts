import { createSlice } from '@reduxjs/toolkit';
import type { GameState } from '../app/interfaces';

const initialState = { ready: false } as GameState;

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setReady: (state) => {
      state.ready = true;
    },
  },
});

export const { setReady } = gameSlice.actions;
export default gameSlice.reducer;

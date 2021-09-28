import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { GameState } from '../app/interfaces';

const initialState = { id: '', ready: false, room: '', disconnect: false, currentTurn: false } as GameState;

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setReady: (state) => {
      state.ready = true;
    },
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    disconnect: (state) => {
      state.disconnect = true;
    },
    setCurrentTurn: (state, action: PayloadAction<boolean>) => {
      state.currentTurn = action.payload;
    },
    switchCurrentTurn: (state) => {
      state.currentTurn = !state.currentTurn;
    },
  },
});

export const { setReady, setID, setRoom, disconnect, setCurrentTurn, switchCurrentTurn } = gameSlice.actions;
export default gameSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { GameState } from '../app/interfaces';

const initialState = { id: '', ready: false, room: '', disconnect: false } as GameState;

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setReady: (state) => {
      state.ready = true;
    },
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      console.log('ID:', state.id);
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
      console.log('Room:', state.room);
    },
    disconnect: (state) => {
      state.disconnect = true;
    },
  },
});

export const { setReady, setID, setRoom, disconnect } = gameSlice.actions;
export default gameSlice.reducer;

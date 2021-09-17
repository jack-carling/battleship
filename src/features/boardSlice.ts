// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface BoardState {
  board: Board[];
}

interface Board {
  index: number;
  marked: boolean;
  ship: boolean;
}

const board: Board[] = [];

for (let i = 0; i < 100; i++) {
  board.push({ index: i, ship: false, marked: false });
}

const initialState = { board } as BoardState;

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value++;
    // },
    // decrement: (state) => {
    //   state.value--;
    // },
  },
});

// export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

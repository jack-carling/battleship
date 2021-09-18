import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoardState {
  board: Board[];
  moveInProcess: boolean;
  offset: Offset;
}

interface Board {
  index: number;
  moving: boolean;
  ship: boolean;
  target: Target;
}

interface Offset {
  n: number;
  e: number;
  s: number;
  w: number;
}
interface Target {
  value: boolean;
  error: boolean;
}

const board: Board[] = [];
const offset: Offset = {
  n: 0,
  e: 0,
  s: 0,
  w: 0,
};

for (let i = 0; i < 100; i++) {
  board.push({ index: i, ship: false, moving: false, target: { value: false, error: false } });
}

board[0].ship = true;
board[1].ship = true;
board[2].ship = true;
board[3].ship = true;
board[4].ship = true;

board[21].ship = true;
board[31].ship = true;
board[41].ship = true;
board[51].ship = true;

const initialState = { board, moveInProcess: false, offset } as BoardState;

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setMoving: (state, action: PayloadAction<number[]>) => {
      state.moveInProcess = true;
      for (let index of action.payload) {
        state.board[index].moving = true;
      }
    },
    setOffset: (state, action: PayloadAction<Offset>) => {
      state.offset = action.payload;
    },
    setTarget: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const { n, e, s, w } = state.offset;
      const result: number[] = [index];
      let error = false;

      for (let i = 1; i <= n; i++) {
        const position = index - 10 * i;
        if (position > 0) {
          result.push(position);
        } else {
          error = true;
        }
      }

      for (let i = 1; i <= e; i++) {
        const row = Math.floor(index / 10);
        const position = index + 1 * i;
        if (Math.floor(position / 10) === row) {
          result.push(position);
        } else {
          error = true;
        }
      }

      for (let i = 1; i <= s; i++) {
        const position = index + 10 * i;
        if (position <= 99) {
          result.push(position);
        } else {
          error = true;
        }
      }

      for (let i = 1; i <= w; i++) {
        const row = Math.floor(index / 10);
        const position = index - 1 * i;
        if (Math.floor(position / 10) === row) {
          result.push(position);
        } else {
          error = true;
        }
      }

      for (let i = 0; i < state.board.length; i++) {
        if (result.indexOf(i) !== -1) {
          state.board[i].target.value = true;
          if (error) {
            state.board[i].target.error = true;
          } else {
            state.board[i].target.error = false;
          }
        } else {
          state.board[i].target.value = false;
          state.board[i].target.error = false;
        }
      }
    },
  },
});

export const { setMoving, setOffset, setTarget } = boardSlice.actions;
export default boardSlice.reducer;

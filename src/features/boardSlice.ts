import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BoardState, Board, Offset, Position } from '../app/interfaces';

const board: Board[] = [];
const position: Position = { old: [], new: [] };
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

const initialState = { board, moveInProcess: false, position, offset } as BoardState;

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setMoving: (state, action: PayloadAction<number[]>) => {
      state.moveInProcess = true;
      state.position.old = [...action.payload];

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

      // Check if out of bounds north
      for (let i = 1; i <= n; i++) {
        const position = index - 10 * i;
        if (position >= 0) {
          result.push(position);
        } else {
          error = true;
          break;
        }
      }

      // Check if out of bounds east
      for (let i = 1; i <= e; i++) {
        const row = Math.floor(index / 10);
        const position = index + 1 * i;
        if (Math.floor(position / 10) === row) {
          result.push(position);
        } else {
          error = true;
          break;
        }
      }

      // Check if out of bounds south
      for (let i = 1; i <= s; i++) {
        const position = index + 10 * i;
        if (position <= 99) {
          result.push(position);
        } else {
          error = true;
          break;
        }
      }

      // Check if out of bounds west
      for (let i = 1; i <= w; i++) {
        const row = Math.floor(index / 10);
        const position = index - 1 * i;
        if (Math.floor(position / 10) === row) {
          result.push(position);
        } else {
          error = true;
          break;
        }
      }

      // Check if any ships are adjacent
      let check: number[] = [];
      const set = new Set<number>();
      const isLeftEdge = index % 10 === 0;
      const isRightEdge = index % 10 === 10 - 1;
      result.forEach((index) => {
        if (!isLeftEdge) {
          set.add(index - 11);
          set.add(index - 1);
          set.add(index + 9);
        }
        if (!isRightEdge) {
          set.add(index - 9);
          set.add(index + 1);
          set.add(index + 11);
        }
        set.add(index - 10);
        set.add(index + 10);
      });
      check = Array.from(set);

      for (let i = 0; i < check.length; i++) {
        const index = check[i];
        if (state.board[index]?.ship && !state.board[index].moving) {
          error = true;
          break;
        }
      }

      // Loop through board to set correct moving values
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

      state.position.new = [...result];
    },
    setPosition: (state) => {
      const [...oldPosition] = state.position.old;
      const [...newPosition] = state.position.new;
      if (state.board.every((square) => !square.target.error)) {
        for (let index of oldPosition) {
          state.board[index].moving = false;
          state.board[index].ship = false;
        }
        for (let index of newPosition) {
          // state.board[index].moving = false;
          state.board[index].ship = true;
          state.board[index].target.value = false;
        }
        state.moveInProcess = false;
      }
    },
  },
});

export const { setMoving, setOffset, setTarget, setPosition } = boardSlice.actions;
export default boardSlice.reducer;

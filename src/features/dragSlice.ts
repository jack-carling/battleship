import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DragState {
  dragging: boolean;
}

const initialState = { dragging: false } as DragState;

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setDrag: (state, action: PayloadAction<boolean>) => {
      state.dragging = action.payload;
    },
  },
});

export const { setDrag } = dragSlice.actions;
export default dragSlice.reducer;

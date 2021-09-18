export interface BoardState {
  board: Board[];
  moveInProcess: boolean;
  offset: Offset;
}

export interface Board {
  index: number;
  moving: boolean;
  ship: boolean;
  target: Target;
}

interface Target {
  value: boolean;
  error: boolean;
}

export interface Offset {
  n: number;
  e: number;
  s: number;
  w: number;
}

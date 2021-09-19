export interface BoardState {
  board: Board[];
  currentIndex: number;
  moveInProcess: boolean;
  position: Position;
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

export interface Position {
  old: number[];
  new: number[];
}

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

export interface EnemyBoardState {
  board: EnemyBoard[];
}

export interface EnemyBoard {
  click: boolean;
  index: number;
  ship: boolean;
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

export interface GameState {
  id: string;
  ready: boolean;
  room: string;
  disconnect: boolean;
  currentTurn: boolean;
}

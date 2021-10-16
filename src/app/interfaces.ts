export interface BoardState {
  board: Board[];
  count: number;
  currentIndex: number;
  moveInProcess: boolean;
  position: Position;
  offset: Offset;
}

export interface Board {
  index: number;
  moving: boolean;
  ship: boolean;
  shot: boolean;
  target: Target;
}

export interface EnemyBoardState {
  board: EnemyBoard[];
  enemyCount: number;
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
  gameOver: boolean;
  id: string;
  ready: boolean;
  room: string;
  disconnect: boolean;
  currentTurn: boolean;
}

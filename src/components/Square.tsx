import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setMoving, setOffset, setTarget } from '../features/boardSlice';

import styles from '../styles/Square.module.scss';

interface Props {
  index: number;
  moving: boolean;
  ship: boolean;
  target: Target;
}
interface Target {
  value: boolean;
  error: boolean;
}

export default function Square({ index, ship, moving, target }: Props) {
  const dispatch = useAppDispatch();
  const { board, moveInProcess } = useAppSelector((state) => state.board);

  function handleClick() {
    if (!ship) return;
    getShip(index);
  }

  function handleMouseOver() {
    if (!moveInProcess) return;
    dispatch(setTarget(index));
  }

  function getShip(index: number) {
    const result: number[] = [];
    let i = index;
    let distance = 1;
    let isHorizontal = true;
    if (!board[i - 1]?.ship && !board[i + 1]?.ship) {
      distance = 10;
      isHorizontal = false;
    }
    while (board[i]?.ship) {
      result.push(i);
      i -= distance;
    }
    i = index + distance;
    while (board[i]?.ship) {
      result.push(i);
      i += distance;
    }
    dispatch(setMoving(result.sort()));
    calculateOffset(index, result.sort(), isHorizontal);
  }

  function calculateOffset(index: number, array: number[], isHorizontal: boolean) {
    let n = 0;
    let e = 0;
    let s = 0;
    let w = 0;
    const offsetStart = array.indexOf(index);
    const offsetEnd = array.length - offsetStart - 1;
    if (isHorizontal) {
      w = offsetStart;
      e = offsetEnd;
    } else {
      n = offsetStart;
      s = offsetEnd;
    }
    dispatch(setOffset({ n, e, s, w }));
  }

  return (
    <div>
      <div
        style={ship ? { backgroundColor: '#ccc' } : {}}
        draggable="false"
        className={`
        ${styles.square}
        ${target.value ? styles.target : ''}
        ${target.error ? styles.error : ''}
        ${moving ? styles.moving : ''}
        `}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
      ></div>
    </div>
  );
}

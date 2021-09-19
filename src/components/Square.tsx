import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setMoving, setOffset, setTarget, setPosition, setCurrentIndex } from '../features/boardSlice';
import type { Board } from '../app/interfaces';

import styles from '../styles/Square.module.scss';

export default function Square({ index, ship, moving, target }: Board) {
  const dispatch = useAppDispatch();
  const { board, moveInProcess } = useAppSelector((state) => state.board);

  function handleClick() {
    if (ship && !moveInProcess) {
      getShip(index);
      dispatch(setCurrentIndex(index));
    } else if (moveInProcess) {
      dispatch(setPosition());
    }
  }

  function handleMouseOver() {
    if (!moveInProcess) return;
    dispatch(setCurrentIndex(index));
    dispatch(setTarget(index));
  }

  function getShip(index: number) {
    const result: number[] = [];
    let i = index;
    let distance = 1;
    let isHorizontal = true;
    const isLeftEdge = i % 10 === 0;
    const isRightEdge = i % 10 === 10 - 1;
    if (
      (isLeftEdge && !board[i + 1]?.ship) ||
      (!board[i - 1]?.ship && !board[i + 1]?.ship) ||
      (isRightEdge && !board[i - 1]?.ship)
    ) {
      distance = 10;
      isHorizontal = false;
    }
    while (board[i]?.ship) {
      result.push(i);
      if (isHorizontal) {
        const isLeftEdge = i % 10 === 0;
        if (isLeftEdge) break;
      }
      i -= distance;
    }
    i = index + distance;
    while (board[i]?.ship) {
      if (isHorizontal) {
        const isRightEdge = (i - 1) % 10 === 10 - 1;
        if (isRightEdge) break;
      }
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
  );
}

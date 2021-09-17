import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setDrag } from '../features/dragSlice';

import styles from '../styles/Square.module.scss';

interface Props {
  index: number;
  marked: boolean;
  ship: boolean;
}

export default function Square({ index, marked, ship }: Props) {
  const { dragging } = useAppSelector((state) => state.drag);

  const dispatch = useAppDispatch();

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    console.log(index);
    dispatch(setDrag(true));
  }

  function handleMouseOver() {
    if (!dragging) return;
    console.log(index);
  }

  function handleMouseUp() {
    console.log(index);
    dispatch(setDrag(false));
  }

  return (
    <div
      style={dragging ? { backgroundColor: 'red' } : {}}
      draggable="false"
      className={styles.square}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      onMouseUp={handleMouseUp}
    ></div>
  );
}

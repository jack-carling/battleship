import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setDrag } from '../features/dragSlice';
import styles from '../styles/Board.module.scss';
import Square from './Square';

export default function Board() {
  const { board } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  console.log(board);

  return (
    <section className={styles.board} onMouseLeave={() => dispatch(setDrag(false))}>
      {board.map((square, index) => (
        <Square key={index} {...square} />
      ))}
    </section>
  );
}

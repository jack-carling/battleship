import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { rotate, setTarget } from '../features/boardSlice';
import styles from '../styles/Board.module.scss';
import Square from './Square';

export default function Board() {
  const dispatch = useAppDispatch();
  const { board, currentIndex, moveInProcess } = useAppSelector((state) => state.board);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, moveInProcess]);

  function handleKeyUp(e: KeyboardEvent) {
    if (e.code !== 'Space') return;
    if (!moveInProcess) return;
    dispatch(rotate());
    dispatch(setTarget(currentIndex));
  }

  return (
    <section className={styles.board}>
      {board.map((square, index) => (
        <Square key={index} {...square} />
      ))}
    </section>
  );
}

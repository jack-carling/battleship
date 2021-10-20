import { useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { rotate, setTarget } from '../features/boardSlice';
import styles from '../styles/Board.module.scss';
import Square from './Square';

export default function Board() {
  const dispatch = useAppDispatch();
  const { board, currentIndex, moveInProcess } = useAppSelector((state) => state.board);
  const { currentTurn, gameOver } = useAppSelector((state) => state.game);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      if (!moveInProcess) return;
      e.preventDefault();
      dispatch(rotate());
      dispatch(setTarget(currentIndex));
    },
    [currentIndex, dispatch, moveInProcess]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentIndex, moveInProcess, handleKeyUp]);

  return (
    <section className={`${styles.board} ${currentTurn ? styles.turn : ''} ${gameOver ? styles.gameOver : ''}`}>
      {board.map((square, index) => (
        <Square key={index} {...square} />
      ))}
    </section>
  );
}

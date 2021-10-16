import { useAppSelector } from '../app/hooks';
import styles from '../styles/Board.module.scss';

import EnemySquare from './EnemySquare';

export default function EnemyBoard() {
  const { board } = useAppSelector((state) => state.enemyBoard);
  const { currentTurn, gameOver } = useAppSelector((state) => state.game);

  return (
    <section
      className={`${styles.board} ${currentTurn && !gameOver ? '' : styles.turn} ${gameOver ? styles.gameOver : ''}`}
    >
      {board.map((square, index) => (
        <EnemySquare key={index} {...square} />
      ))}
    </section>
  );
}

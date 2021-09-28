import { useAppSelector } from '../app/hooks';
import styles from '../styles/Board.module.scss';

import EnemySquare from './EnemySquare';

export default function EnemyBoard() {
  const { board } = useAppSelector((state) => state.enemyBoard);
  const { currentTurn } = useAppSelector((state) => state.game);

  return (
    <section className={`${styles.board} ${currentTurn ? '' : styles.turn}`}>
      {board.map((square, index) => (
        <EnemySquare key={index} {...square} />
      ))}
    </section>
  );
}

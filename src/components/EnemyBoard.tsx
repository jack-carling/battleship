import { useAppSelector } from '../app/hooks';
import styles from '../styles/Board.module.scss';

import EnemySquare from './EnemySquare';

export default function EnemyBoard() {
  const { board } = useAppSelector((state) => state.board);

  return (
    <section className={styles.board}>
      {board.map((square, index) => (
        <EnemySquare key={index} {...square} />
      ))}
    </section>
  );
}

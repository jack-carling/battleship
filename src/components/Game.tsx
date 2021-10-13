import styles from '../styles/Game.module.scss';
import logo from '../assets/logo.png';

import { useAppSelector } from '../app/hooks';

import Board from './Board';
import EnemyBoard from './EnemyBoard';
import Info from './Info';

export default function Game() {
  const { enemyCount } = useAppSelector((state) => state.enemyBoard);
  const { count } = useAppSelector((state) => state.board);
  return (
    <section className={styles.game}>
      <img src={logo} className={styles.logo} alt="Logo" />
      <section className={styles.boards}>
        <div className={styles.info}>
          <span>You</span>
          <span>
            <i className="material-icons">adjust</i>
            {count}/17
          </span>
        </div>
        <div className={styles.info}>
          <span>Opponent</span>
          <span>
            <i className="material-icons">adjust</i>
            {enemyCount}/17
          </span>
        </div>
        <Board />
        <EnemyBoard />
        <Info />
      </section>
    </section>
  );
}

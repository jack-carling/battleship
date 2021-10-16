import styles from '../styles/Game.module.scss';
import logo from '../assets/logo.png';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import Board from './Board';
import EnemyBoard from './EnemyBoard';
import Info from './Info';
import { useEffect } from 'react';
import { setGameOver } from '../features/gameSlice';

export default function Game() {
  const dispatch = useAppDispatch();
  const { enemyCount } = useAppSelector((state) => state.enemyBoard);
  const { count } = useAppSelector((state) => state.board);

  useEffect(() => {
    if (enemyCount === 17 || count === 17) {
      dispatch(setGameOver());
    }
  }, [enemyCount, count, dispatch]);

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

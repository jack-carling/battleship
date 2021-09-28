import styles from '../styles/Game.module.scss';
import logo from '../assets/logo.png';

import Board from './Board';
import EnemyBoard from './EnemyBoard';
import Info from './Info';

export default function Game() {
  return (
    <section className={styles.game}>
      <img src={logo} className={styles.logo} alt="Logo" />
      <section className={styles.boards}>
        <div className={styles.info}>You</div>
        <div className={styles.info}>Opponent</div>
        <Board />
        <EnemyBoard />
        <Info />
      </section>
    </section>
  );
}

import styles from '../styles/Game.module.scss';
import logo from '../assets/logo.png';

import Board from './Board';

export default function Game() {
  return (
    <section className={styles.game}>
      <img src={logo} className={styles.logo} alt="Logo" />
      <Board />
    </section>
  );
}

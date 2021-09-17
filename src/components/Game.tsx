import React from 'react';
import styles from '../styles/Game.module.scss';

import Board from './Board';

export default function Game() {
  return (
    <section className={styles.game}>
      <Board />
    </section>
  );
}

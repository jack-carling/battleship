import React from 'react';
import styles from './Game.module.scss';

import Board from '../board/Board';

export default function Game() {
  return (
    <section className={styles.game}>
      <Board />
    </section>
  );
}

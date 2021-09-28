import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setReady } from '../features/gameSlice';
import styles from '../styles/Info.module.scss';

export default function Info() {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board);
  const { id, ready, room, disconnect, currentTurn } = useAppSelector((state) => state.game);

  const handleReady = useCallback(async () => {
    const ships: number[] = [];
    board.forEach((square) => {
      if (square.ship) ships.push(square.index);
    });
    const data = JSON.stringify({ id, ships });
    await fetch('/sse/ready', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
  }, [board, id]);

  useEffect(() => {
    if (ready && !room) {
      handleReady();
    }
  }, [ready, room, handleReady]);

  if (!ready) {
    return (
      <section className={styles.info}>
        <span className={styles.header}>How to arrange</span>
        <span>
          Click on a ship to highlight it and then move the cursor around the board. Green will indicate a valid
          position to place the ship, red will not allow you to place the ship. Press the space bar to rotate the ship
          when highlighted and click to place the ship in its new position. When done arranging click the ready button.
        </span>
        <button onClick={() => dispatch(setReady())}>READY</button>
      </section>
    );
  } else if (disconnect) {
    return (
      <section className={styles.info}>
        <span className={styles.header}>Your opponent has disconnected.</span>
      </section>
    );
  } else if (room) {
    return (
      <section className={styles.info}>
        <span className={styles.header}>{currentTurn ? `Let's go!` : `It's your opponent's turn...`}</span>
      </section>
    );
  } else {
    return (
      <section className={styles.info}>
        <span className={styles.header}>Waiting on opponent...</span>
        <div className={styles.loading}></div>
      </section>
    );
  }
}

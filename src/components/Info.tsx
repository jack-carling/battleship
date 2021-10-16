import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setReady } from '../features/gameSlice';
import styles from '../styles/Info.module.scss';

export default function Info() {
  const dispatch = useAppDispatch();
  const { board, count } = useAppSelector((state) => state.board);
  const { id, ready, room, disconnect, currentTurn, gameOver } = useAppSelector((state) => state.game);

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
  } else if (gameOver) {
    return (
      <section className={styles.info}>
        <span className={styles.header}>Game Over</span>
        {count === 17 && <span>You lost!</span>}
        {count !== 17 && <span>You won!</span>}
        <button onClick={() => window.location.reload()}>PLAY AGAIN</button>
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
        <span className={styles.header}>Current turn: {currentTurn ? `You` : `Opponent`}</span>
        {currentTurn && (
          <span>
            Click on the enemy board to place your shot. You may go again if you hit a ship, indicated by a red circle.
          </span>
        )}
        {!currentTurn && <span>Please wait for the opponent to make a move.</span>}
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

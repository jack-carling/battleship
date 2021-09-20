import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setReady } from '../features/gameSlice';
import styles from '../styles/Info.module.scss';

export default function Info() {
  const dispatch = useAppDispatch();
  const { ready } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (ready) console.log('[Info.tsx] Ready');
  }, [ready]);

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
  } else {
    return (
      <section className={styles.info}>
        <span className={styles.header}>Waiting on opponent...</span>
        <div className={styles.loading}></div>
      </section>
    );
  }
}

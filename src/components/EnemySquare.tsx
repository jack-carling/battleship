import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setClick } from '../features/enemyBoardSlice';
import { switchCurrentTurn } from '../features/gameSlice';
import type { EnemyBoard } from '../app/interfaces';

import styles from '../styles/Square.module.scss';

export default function EnemySquare({ click, index, ship }: EnemyBoard) {
  const { id, room } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  async function handleClick() {
    if (click) return;
    if (ship) {
      // Hit a ship - current player goes again
    } else {
      // Missed - switch turns
      const data = JSON.stringify({ id, room });
      await fetch('/sse/switch-turns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      dispatch(switchCurrentTurn());
    }
    const data = JSON.stringify({ id, index, room });
    await fetch('/sse/shot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    dispatch(setClick(index));
  }
  return (
    <div draggable="false" className={styles.square} onClick={handleClick}>
      <div className={`${click ? styles.click : ''} ${ship ? styles.ship : ''}`}></div>
    </div>
  );
}

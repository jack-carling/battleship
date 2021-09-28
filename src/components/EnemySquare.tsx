import { useAppDispatch } from '../app/hooks';
import { setClick } from '../features/enemyBoardSlice';
import type { EnemyBoard } from '../app/interfaces';

import styles from '../styles/Square.module.scss';

export default function EnemySquare({ click, index, ship }: EnemyBoard) {
  const dispatch = useAppDispatch();
  function handleClick() {
    if (click) return;
    if (ship) {
      // Hit a ship - current player goes again
    } else {
      // Missed - switch turns
    }
    dispatch(setClick(index));
  }
  return (
    <div draggable="false" className={styles.square} onClick={handleClick}>
      <div className={`${click ? styles.click : ''} ${ship ? styles.ship : ''}`}></div>
    </div>
  );
}

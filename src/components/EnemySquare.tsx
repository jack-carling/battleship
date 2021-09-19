import styles from '../styles/Square.module.scss';

export default function EnemySquare() {
  return <div draggable="false" className={styles.square}></div>;
}

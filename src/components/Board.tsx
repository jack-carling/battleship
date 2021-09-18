import { useAppSelector } from '../app/hooks';
import styles from '../styles/Board.module.scss';
import Square from './Square';

export default function Board() {
  const { board } = useAppSelector((state) => state.board);

  return (
    <section className={styles.board}>
      {board.map((square, index) => (
        <Square key={index} {...square} />
      ))}
    </section>
  );
}

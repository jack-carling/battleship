import styles from '../styles/Info.module.scss';

export default function Info() {
  return (
    <section className={styles.info}>
      <span>
        How to arrange: Click on a ship to highlight it and then move the cursor around the board. Green will indicate a
        valid position to place the ship, red will not allow you to place the ship. Press the space bar to rotate the
        ship when highlighted and click to place the ship in its new position. When done arranging click the ready
        button.
      </span>
    </section>
  );
}

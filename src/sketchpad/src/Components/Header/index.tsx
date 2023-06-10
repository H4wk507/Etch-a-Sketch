import styles from "./style.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Etch a Sketch</h1>
    </div>
  );
}

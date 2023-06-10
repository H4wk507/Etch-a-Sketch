import styles from "./style.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a
        href="https://github.com/H4wk507/Etch-a-Sketch"
        target="_blank"
        rel="noreferrer"
        className={styles["gh-link"]}
      >
        GitHub
      </a>
    </div>
  );
}

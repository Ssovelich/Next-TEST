import styles from "./Loader.module.css";

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.circle} />
    <div className={styles.circle} />
    <div className={styles.circle} />
  </div>
);

export default Loader;

import styles from "./styles.module.css";

export const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
    <div className={styles.lds_ring}><div></div><div></div><div></div><div></div></div>
    {/* //   <div className={styles.loadingIcon}></div> */}
    </div>
  );
};

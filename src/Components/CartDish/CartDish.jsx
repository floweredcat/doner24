import classNames from "classnames";
import styles from "./styles.module.css";

export const CartDish = ({ dish, increment, decrement, dishCount, url }) => {
  return (
    <div className={styles.dish}>
      <div className={styles.contentContainer}>
        {url ? (
          <img
            src={url}
            alt={dish.NAME}
            className={styles.img}
            loading="lazy"
          />
        ) : (
          <div className={styles.gag} />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{dish.NAME}</div>
        <div className={styles.price}>{dish.MCENA}</div>
      </div>
        <div className={styles.actions}>
          <button
            onClick={decrement}
            className={classNames(styles.action, styles.action_down)}>
            -
          </button>
          {dishCount}
          <button
            onClick={increment}
            className={styles.action}>
            +
          </button>
        </div>
    </div>
  );
};
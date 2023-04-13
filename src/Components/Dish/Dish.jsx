import classNames from "classnames";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

export const Dish = ({ dish, increment, decrement, dishCount, url, isActive }) => {
  const {type} = useParams()

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
      { isActive && (!dishCount ? (
        <button
          onClick={increment}
          className={styles.firstAction}>
          Добавить
        </button>
      ) : (
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
      ))}
    </div>
  );
};

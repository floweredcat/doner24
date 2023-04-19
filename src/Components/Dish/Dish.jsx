import classNames from "classnames";
import styles from "./styles.module.css";
import { separateAmount } from "../../helpers/separateAmount";
import { ActionButton } from "../../UI/ActionButton/ActionButton";

export const Dish = ({ dish, increment, decrement, dishCount, url, isActive, onclick }) => {

  return (
    <div className={styles.dish}>
      <div className={styles.contentContainer}>
        {url ? (
          <img
            src={url}
            alt={dish.NAME}
            className={styles.img}
            loading="lazy"
            onClick={onclick}
          />
        ) : (
          <div className={styles.gag} />
        )}

      </div>
      <div className={styles.info}>
        <div className={styles.name}>{dish.NAME}</div>
        <div className={styles.price}>{separateAmount(dish.MCENA)}</div>
      </div>
      { isActive && (!dishCount ? (
          <ActionButton.Add onclick={increment}>
            Добавить
          </ActionButton.Add>
      ) : (
        <div className={styles.actions}>
          <ActionButton.Counter
            onclick={decrement}>
            -
          </ActionButton.Counter>
          {dishCount}
          <ActionButton.Counter
            onclick={increment}>
            +
          </ActionButton.Counter>
        </div>
      ))}
    </div>
  );
};

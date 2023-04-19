import classNames from "classnames";
import styles from "./styles.module.css";
import { separateAmount } from "../../helpers/separateAmount";
import { ActionButton } from "../../UI/ActionButton/ActionButton";

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
        <div className={styles.info}>
          <div className={styles.name}>{dish.NAME}</div>
          <div className={styles.price}>{separateAmount(dish.MCENA)}</div>
        </div>
      </div>
        <div className={styles.actions}>
          <ActionButton.Counter onclick={decrement}>
            -
          </ActionButton.Counter>
          {dishCount}
          <ActionButton.Counter onclick={increment}>
            +
          </ActionButton.Counter>
        </div>
    </div>
  );
};
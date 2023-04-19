import styles from "./styles.module.css";
import { separateAmount } from "../../helpers/separateAmount";
import { ActionButton } from "../../UI/ActionButton/ActionButton";

export const DishPopup = ({ dish, increment, decrement, dishCount, url, isActive }) => {

  return (
    <div className={styles.dish}>
      <div className={styles.contentContainer}>
          <img
            src={url}
            alt={dish.NAME}
            className={styles.img}
            loading="lazy"
          />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{dish.NAME}</div>
        <div className={styles.descr}>{dish.DESCR}</div>
        <div className={styles.price}>{separateAmount(dish.MCENA)}</div>
      </div>
      { isActive && (!dishCount ? (
          <ActionButton.Add onclick={increment}>
            Добавить
          </ActionButton.Add>
        ) : (
        <div className={styles.actions}>
          <ActionButton.Counter onclick={decrement}>
            -
          </ActionButton.Counter>
          {dishCount}
          <ActionButton.Counter onclick={increment}>
            +
          </ActionButton.Counter>
        </div>
      ))}
    </div>
  );
};

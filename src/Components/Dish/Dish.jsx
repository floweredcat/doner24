import classNames from "classnames";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadDishImageById } from "../../store/dish/Thunks/loadDishImageById";
import styles from "./styles.module.css";

export const Dish = ({ dish, increment, decrement, dishCount, id }) => {
  const {type} = useParams()
  // useEffect(() => {
  //   loadDishImageById({ id, dishId: dish.ID });
  // }, [dish]);

  return (
    <div className={classNames(styles.dish)}>
      <div className={styles.contentContainer}>
        {dish.url ? (
          <img
            src={dish.url}
            alt={dish.NAME}
            className={classNames(styles.img)}
            loading="lazy"
          />
        ) : (
          <div className={styles.gag} />
        )}
        <div className={styles.name}>{dish.NAME}</div>
        <div className={styles.price}>{dish.MCENA}</div>
      </div>
      { type && (!dishCount ? (
        <button
          onClick={increment}
          className={classNames(styles.firstAction)}>
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

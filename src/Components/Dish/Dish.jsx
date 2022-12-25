import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dishesSliceActions } from "../../store/dish";
import styles from "./styles.module.css";

export const Dish = ({ dish, increment, decrement, dishCount }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      `http://wsuno.xyz:5680/2/15046/?s=select img from tbmenu where id=${dish.ID}`,
      { mode: "no-cors" }
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        dispatch(
          dishesSliceActions.addImg({
            dishId: dish.ID,
            url: `data:image/jpeg;base64,${data.toString("base64")}`,
          }),
          []
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [dish]);

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
      {!dishCount && (
        <button
          onClick={increment}
          className={classNames(styles.firstAction)}>
          Добавить
        </button>
      )}
      {dishCount > 0 && (
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
      )}
    </div>
  );
};

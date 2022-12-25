import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Cart } from "../../pages/Cart";
import { FormSubmit } from "../../pages/FormSubmit/FormSubmit";
import { selectCartLength } from "../../store/cart/selectors";
import { selectDishes, selectDishPrice } from "../../store/dish/selectors";
import styles from "./styles.module.css";

export const SliderContainer = () => {
  const cart = useSelector((state) => selectCartLength(state));
  const dishes = useSelector((state) => selectDishes(state));
  const countes = Object.values(cart);
  const ids = Object.keys(cart);
  const dishPrices = ids.map((el) => dishes[el].MCENA);
  let result =
    dishPrices.reduce((acc, el, idx) => acc + countes[idx] * el, 0) + 500;

  const [isActive, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!isActive);
  };

  return (
    <div className={styles.sliderContainer}>
      <div
        className={classNames(styles.sliderElement, styles.cart, {
          [styles.movedCart]: isActive,
        })}>
        <Cart
          toggleFunction={toggleActive}
          result={result}
        />
      </div>
      <div
        className={classNames(styles.sliderElement, styles.form, {
          [styles.movedForm]: isActive,
        })}>
        <FormSubmit
          toggleFunction={toggleActive}
          result={result}
        />
      </div>
    </div>
  );
};

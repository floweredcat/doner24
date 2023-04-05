import classNames from "classnames";
import { useState } from "react";
import { Cart } from "../../pages/Cart";
import { FormSubmit } from "../../pages/FormSubmit/FormSubmit";
import styles from "./styles.module.css";

export const SliderContainer = () => {

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
        />
      </div>
      <div
        className={classNames(styles.sliderElement, styles.form, {
          [styles.movedForm]: isActive,
        })}>
        <FormSubmit
          toggleFunction={toggleActive}
        />
      </div>
    </div>
  );
};

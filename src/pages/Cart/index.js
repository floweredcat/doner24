import { useDispatch, useSelector } from "react-redux";
import {
  selectCartDishIds,
  selectCartLength,
} from "../../store/cart/selectors";
import { DishContainer } from "../../containers/DishContainer/DishContiner";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { cartSliceActions } from "../../store/cart";
import { useCallback } from "react";

export const Cart = ({ toggleFunction, result }) => {
  const dishIds = useSelector(selectCartDishIds);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cleanCart = useCallback(
    () => dispatch(cartSliceActions.cleanCart()),
    []
  );
  const cart = useSelector((state) => selectCartLength(state));
  let cartLenght = Object.values(cart)?.reduce((acc, el) => acc + el, 0);
  const filledDishIds = dishIds.filter((el) => cart[el] != 0);

  return (
    <div className={styles.cartContainer}>
      <button
        onClick={() => {
          if (window.confirm("Очистить корзину?")) {
            cleanCart();
            navigate("/");
          }
        }}
        disabled={cartLenght === 0}
        className={styles.clean}></button>
      <Link
        to="/"
        className={styles.back}></Link>
      <h2 className={classNames(styles.title)}>Корзина</h2>
      {result != 500 && (
        <div className={styles.account}>
          <div className={styles.delivery}>{`Доставка: ${500}`}</div>
          <div className={styles.result}>{`Итого: ${result}`}</div>
        </div>
      )}
      {filledDishIds.map((id) => (
        <DishContainer
          key={id}
          dishId={id}
        />
      ))}
      <button
        onClick={() => toggleFunction()}
        className={styles.button}
        disabled={cartLenght === 0}>
        Далее
      </button>
    </div>
  );
};

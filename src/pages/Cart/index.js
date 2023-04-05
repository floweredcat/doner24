import { useDispatch, useSelector } from "react-redux";
import {
  selectCartDishIds,
  selectCartLength,
} from "../../store/cart/selectors";
import { DishContainer } from "../../containers/DishContainer/DishContiner";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { cartSliceActions } from "../../store/cart";
import { useCallback } from "react";
import { getIsOrderAviable } from "../../store/cart/thunks/getIsIsOrderAvialable";
import { useParams } from "react-router-dom";
import { addLocale } from "../../store/cart/thunks/addLocale";

export const Cart = ({ toggleFunction }) => {
  const {idsrv, type, value} = useParams();
  const isAvialable = getIsOrderAviable({idsrv, type, value});
  const dishIds = useSelector(selectCartDishIds);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cleanCart = useCallback(
    () => dispatch(cartSliceActions.cleanCart()),
    []
  );
  const cartLenght = useSelector((state) => selectCartLength(state));
  const result = dishIds.reduce((acc, item) => {
    return acc + item.amount
  }, 500);

    const items = dishIds.map(el => (
    {
      idmenu: el.dishId,
      klv: el.count
    }
  ))

  const onSubmit = () => {
    isAvialable().then(data => {
      if (data.EXS) {
        alert('success')
        addLocale({idsrv, uid: data.UID, items})
      }
      else alert('error')
    })
    .catch(err => console.log(err))
  }


  return (
    <div className={styles.cartContainer}>
      <button
        onClick={() => {
          if (window.confirm("Очистить корзину?")) {
            cleanCart();
            navigate(-1);
          }
        }}
        disabled={cartLenght === 0}
        className={styles.clean}></button>
      <button
      type="button"
        onClick={() => navigate(-1)}
        className={styles.back}></button>
      <h2 className={classNames(styles.title)}>Корзина</h2>
      {1 != 500 && (
        <div className={styles.account}>
          <div className={styles.delivery}>{`Доставка: ${500}`}</div>
          <div className={styles.result}>{`Итого: ${result}`}</div>
        </div>
      )}
      {dishIds.filter(el => el.count > 0).map((el) => (
        <DishContainer
          key={el.dishId + " " + el.idfolder}
          dishId={el.dishId}
          idfolder={el.idfolder}
          isActive
        />
      ))}
      <button
        onClick={() => type && value ? onSubmit() : toggleFunction()}
        className={styles.button}
        disabled={cartLenght === 0}>
        {type && value ? "Отправить заказ" : "Далее"}
      </button>
    </div>
  );
};

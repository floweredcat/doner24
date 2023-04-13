import { useDispatch, useSelector } from "react-redux";
import {
  selectCartDishIds,
  selectCartLength,
} from "../../store/cart/selectors";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { cartSliceActions } from "../../store/cart";
import { useCallback } from "react";
import { getIsOrderAviable } from "../../store/cart/thunks/getIsIsOrderAvialable";
import { useParams } from "react-router-dom";
import { addLocale } from "../../store/cart/thunks/addLocale";
import {Button} from '../../Components/Button/Button'
import { CartDishContainer } from "../../containers/CartDishContainer/CartDishContainer";
import { CartHeader } from "../../Components/CartHeader/CartHeader";

export const Cart = () => {
  const {idsrv, type, value} = useParams();
  const redirectedAdress = type && value ? `/${idsrv}/${type}/${value}` : `/${idsrv}`
  const isAvialable = getIsOrderAviable({idsrv, type, value});
  const dishIds = useSelector(selectCartDishIds);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cleanCart = () => dispatch(cartSliceActions.cleanCart());
  const cartLenght = useSelector((state) => selectCartLength(state));
  const result = dishIds.reduce((acc, item) => {
    return acc + item.amount
  }, 0);

    const items = dishIds.map(el => (
    {
      idmenu: el.dishId,
      klv: el.count
    }
  ))

  const onSubmit = () => {
    isAvialable().then(data => {
      if (data.EXS) {
        addLocale({idsrv, uid: data.UID, items})
        .then(data => {
            if (data.OK) {
              alert('Заказ отправлен!')
              cleanCart()
              navigate(redirectedAdress)
            }
            else {
              alert('Упс! Что-то пошло не так...')
            }
          })
      }
      else alert('Упс! Что-то пошло не так...')
    })
    .catch(err => console.log(err))
  }


  return (
    <div className={styles.cart}>
      <div className={styles.dishesWrapper}>
    <div className={styles.cartContainer}>
    <CartHeader title={"Корзина"} />
      {dishIds.filter(el => el.count > 0).map((el) => (
        <CartDishContainer
          key={el.dishId + " " + el.idfolder}
          dishId={el.dishId}
          idfolder={el.idfolder}
          isActive />
      ))}
      </div>
    </div>
    <div>
    {1 != 0 && (
        <div className={styles.account}>
          <div className={styles.result}>{`Итого: ${result}`}</div>
        </div>
      )}
    <Button 
    title={type && value ? "Отправить заказ" 
    : "Далее"} 
    disabled={cartLenght === 0} 
    onclick={() => type && value ? onSubmit() 
    : navigate(`/${idsrv}/submit`)} />
    </div>
    </div>
  );
};

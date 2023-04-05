import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { DishContainer } from "../../containers/DishContainer/DishContiner";
import classNames from "classnames";
import styles from "./styles.module.css";
import { selectCartLength } from "../../store/cart/selectors";
import { Loading } from "../../pages/Loading/Loading";
import {
  selectDishIdsByFolderId,
  selectIsDishesLoading,
} from "../../store/dish/selectors";
import { useLoadDishes } from "./Hooks/useLoadDishes";
import { nanoid } from "nanoid";

export const Menu = ({ id }) => {
  const {idsrv} = useParams()
  useLoadDishes({idfolder: id, idsrv});
  const isLoading = useSelector((state) => selectIsDishesLoading(state));
  const cart = useSelector((state) => selectCartLength(state));
  const cartLength = Object.values(cart).reduce((acc, el) => {
    return acc + el;
  }, 0);

  const dishes = useSelector(state => selectDishIdsByFolderId(state, {id}))

  if (isLoading ) {
    return <Loading />;
  }

  return (
    <div className={classNames(styles.dishesContainer)}>
      {dishes?.map((dish) => {
        return (
          <DishContainer
            key={nanoid()}
            dishId={dish}
            idfolder={id}
          />
        );
      })}
      {cartLength > 0 && (
        <Link
          to="/cart"
          className={classNames(styles.cartButton)}>{`Корзина ${cartLength} ${
          cartLength > 1 ? "товара" : "товар"
        }`}</Link>
      )}
    </div>
  );
};

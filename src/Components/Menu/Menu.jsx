import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { DishContainer } from "../../containers/DishContainer/DishContiner";
import classNames from "classnames"
import styles from "./styles.module.css"
import { selectCartLength } from "../../store/cart/selectors";
import { Loading } from "../../pages/Loading/Loading";
import { selectDishes, selectIsDishesLoading } from "../../store/dish/selectors";
import { useLoadDishes } from "./Hooks/useLoadDishes";
import { useEffect, useState } from "react";
import { dishesSliceActions } from "../../store/dish";

export const Menu = ({activeIndex}) => {
  useLoadDishes();
  const isLoading = useSelector((state) => selectIsDishesLoading(state));
  const cart = useSelector((state) => selectCartLength(state));
  const cartLength = Object.values(cart).reduce((acc, el) => {return acc+el}, 0);

  const newDishes = Object.values(useSelector(state => selectDishes(state)));
  const dishes = newDishes.filter(el => el.PID == activeIndex);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={classNames(styles.dishesContainer)}>
        {dishes?.map((dish) => {
            return (
                <DishContainer
                    key={dish.ID}
                    dishId={dish.ID}
                />
            );
        })
    }
    {cartLength > 0 && <Link to="/cart" className={classNames(styles.cartButton)}>{`Корзина ${cartLength} ${cartLength > 1 ? 'товара' : 'товар'}`}</Link>}
    </div> )
};

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { Button } from "../Button/Button";

export const Menu = ({ id }) => {
  const navigate = useNavigate()
  const {idsrv, type, value} = useParams()
  useLoadDishes({idfolder: id, idsrv});
  const isLoading = useSelector((state) => selectIsDishesLoading(state));
  const cartLength = useSelector((state) => selectCartLength(state));

  const dishes = useSelector(state => selectDishIdsByFolderId(state, {id}))

  if (isLoading ) {
    return <Loading />;
  }

  return (
    <>
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
    </div>
          {cartLength > 0  && (
            <Button onclick={() => navigate(type && value ? `/${idsrv}/${type}/${value}/cart` : `/${idsrv}/cart`)} 
            title={`Корзина ${cartLength} ${
               cartLength > 1 ? "товара" : "товар"
              }`} />
          )}
          </>
  );
};

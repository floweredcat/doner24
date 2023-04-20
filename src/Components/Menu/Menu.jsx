import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DishContainer } from "../../containers/DishContainer/DishContiner";
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
import { selectOrgType } from "../../store/organization/selectors";
import { useState } from "react";
import { PopupContainer } from '../../containers/PopupContainer/PopupContainer'
import {DishPopupContainer} from '../../containers/DishPopupContainer/DishPopupContainer'
import { getButtonTitle } from "../../helpers/getCartButtonTitle";

export const Menu = ({ idfolder }) => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);
  const {idsrv, type, value} = useParams()
  useLoadDishes({idfolder, idsrv});
  const isLoading = useSelector((state) => selectIsDishesLoading(state));
  const cartLength = useSelector((state) => selectCartLength(state));

  const dishes = useSelector(state => selectDishIdsByFolderId(state, {id: idfolder}))
  const workType = useSelector(state => selectOrgType(state));

  const onclick = (dish) => {
    setIsOpened(!isOpened);
    setCurrentDish(dish|| null);
    document.body.style.position = dish ? 'fixed' : '';
  }

  if (isLoading ) {
    return <Loading />;
  }

  return (
    <div className={styles.menu}>
    <div className={styles.dishesContainer}>
      {dishes?.map((dish) => {
        return (
          <DishContainer
            key={nanoid()}
            dishId={dish}
            idfolder={idfolder}
            isActive={workType != 0}
            onclick={() => onclick(dish)}
          />
        );
      })}
    </div>
            <Button onclick={() => navigate(type && value ? `/${idsrv}/${type}/${value}/cart` : `/${idsrv}/cart`)} 
            title={`Корзина ${cartLength} ${
              getButtonTitle(cartLength)
              }`} 
              isActive={cartLength > 0}/>
              {isOpened && 
              <PopupContainer togglePopup={onclick}>
              <DishPopupContainer
                key={nanoid()}
                dishId={currentDish}
                idfolder={idfolder}
                isActive={workType != 0}
                onclick={() => onclick()}
          />
              </PopupContainer>}
          </div>
  );
};

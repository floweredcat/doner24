import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "../../store/cart";
import { selectDishCount } from "../../store/cart/selectors";
import { selectDishById, selectDishUrlById } from "../../store/dish/selectors";
import { DishPopup } from "../../Components/DishPopup/DishPopup";


export const DishPopupContainer = ({dishId, idfolder, isActive, onclick}) => {
    const dispatch = useDispatch();
    const dish = useSelector(state => selectDishById(state, {dishId, idfolder}))
    const count = useSelector(state => selectDishCount(state, {dishId, idfolder}))
    const url = useSelector((state) => selectDishUrlById(state, {dishId}))

    const increment = useCallback(() => dispatch(cartSliceActions.addDish({dishId, idfolder, price:dish.MCENA})), [dishId]);
    const decrement = useCallback(() => dispatch(cartSliceActions.removeDish(dishId)), [dishId]);

    if (!dish) {
      return null;
    }

    return (
        <DishPopup
            dish={dish}
            increment={increment}
            decrement={decrement}
            dishCount={count}
            url={url}
            isActive={isActive}
            onclick={onclick}
        />
    )
}
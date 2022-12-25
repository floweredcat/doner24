import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dish } from "../../Components/Dish/Dish";
import { cartSliceActions } from "../../store/cart";
import { selectDishCount } from "../../store/cart/selectors";
import { selectDishById } from "../../store/dish/selectors";


export const DishContainer = ({dishId, ...props}) => {
    const dishCount = useSelector(state => selectDishCount(state, { dishId }));
    const dish = useSelector(state => selectDishById(state, {dishId}))

    const dispatch = useDispatch();

    const increment = useCallback(() => dispatch(cartSliceActions.addDish(dishId)), [dishId]);
    const decrement = useCallback(() => dispatch(cartSliceActions.removeDish(dishId)), [dishId]);

    if (!dish) {
      return null;
    }

    return (
        <Dish
            dish={dish}
            increment={increment}
            decrement={decrement}
            dishCount={dishCount}
            {...props}
        />
    )
}
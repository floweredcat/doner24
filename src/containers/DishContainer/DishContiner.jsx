import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Dish } from "../../Components/Dish/Dish";
import { cartSliceActions } from "../../store/cart";
import { selectDishCount } from "../../store/cart/selectors";
import { selectDishById, selectDishUrlById } from "../../store/dish/selectors";
import { loadDishImageById } from "../../store/dish/Thunks/loadDishImageById";


export const DishContainer = ({dishId, idfolder, isActive}) => {
    const {idsrv, type} = useParams()
    const dispatch = useDispatch();
    const dish = useSelector(state => selectDishById(state, {dishId, idfolder}))
    const count = useSelector(state => selectDishCount(state, {dishId, idfolder}))
    const url = useSelector((state) => selectDishUrlById(state, {dishId}))

    useEffect(() => {
        if (dish?.IMG) {
            dispatch(loadDishImageById({idsrv, dishId}))
        }
    }, [dishId])

    const increment = useCallback(() => dispatch(cartSliceActions.addDish({dishId, idfolder, price:dish.MCENA})), [dishId]);
    const decrement = useCallback(() => dispatch(cartSliceActions.removeDish(dishId)), [dishId]);

    if (!dish) {
      return null;
    }

    return (
        <Dish
            dish={dish}
            increment={increment}
            decrement={decrement}
            dishCount={count}
            url={url}
            isActive={isActive}
        />
    )
}
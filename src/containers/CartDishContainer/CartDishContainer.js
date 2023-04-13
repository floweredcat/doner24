import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { cartSliceActions } from "../../store/cart";
import { selectDishCount } from "../../store/cart/selectors";
import { selectDishById, selectDishUrlById } from "../../store/dish/selectors";
import { loadDishImageById } from "../../store/dish/Thunks/loadDishImageById";
import { CartDish } from "../../Components/CartDish/CartDish";


export const CartDishContainer = ({dishId, idfolder}) => {
  const {idsrv} = useParams()
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
        <CartDish
            dish={dish}
            increment={increment}
            decrement={decrement}
            dishCount={count}
            url={url}
        />
    )
}
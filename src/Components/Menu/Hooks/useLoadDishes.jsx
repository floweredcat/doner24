import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadDishesIfNotExist } from "../../../store/dish/Thunks/loadDishesIfNotExist";

export const useLoadDishes = ({idsrv, idfolder}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDishesIfNotExist({idsrv, idfolder}));
  }, [dispatch, idfolder]);
};

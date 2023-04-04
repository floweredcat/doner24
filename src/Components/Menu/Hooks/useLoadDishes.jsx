import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadDishesIfNotExist } from "../../../store/dish/Thunks/loadDishesIfNotExist";

export const useLoadDishes = ({id}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDishesIfNotExist({id}));
  }, [dispatch]);
};

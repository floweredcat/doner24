import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadDishesIfNotExist } from "../../../store/dish/Thunks/loadDishesIfNotExist";

export const useLoadDishes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDishesIfNotExist);
  }, [dispatch]);
};

export const selectDishModule = (state) => state.dish;

export const selectDishIds = (state) => selectDishModule(state).ids;

export const selectDishById = (state, { dishId }) =>
  selectDishModule(state).entities[dishId];

export const selectDishNameById = (state, { dishId }) =>
  selectDishById(state, { dishId })?.name;

export const selectIsDishesLoading = (state) =>
  selectDishModule(state).status === "loading";

export const selectDishes = (state) => selectDishModule(state).entities;

export const selectDishPrice = (state, { dishId }) =>
  selectDishes(state)[dishId].MCENA;

import { createSelector } from "@reduxjs/toolkit";

export const selectCartModule = (state) => state.cart;

export const selectDishCount = (state, { dishId }) =>
  selectCartModule(state).entities[dishId]?.count;

export const selectCartDishIds = createSelector([selectCartModule], (cart) =>
  Object.values(cart.entities)
);

export const selectCartLength = (state) =>  Object.values(selectCartModule(state).entities).reduce((acc, el) => {
  return acc + el.count
}, 0);

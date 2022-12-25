import { createSelector } from "@reduxjs/toolkit";

export const selectCartModule = (state) => state.cart;

export const selectDishCount = (state, { dishId }) =>
  selectCartModule(state).entities[dishId];

export const selectCartDishIds = createSelector([selectCartModule], (cart) => 
  Object.keys(cart.entities)
);

export const selectCartLength = (state) => selectCartModule(state).entities
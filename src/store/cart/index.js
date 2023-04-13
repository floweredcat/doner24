import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  ids: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDish: (state, action) => {
      const {dishId, idfolder, price} = action.payload;

      const count = (state.entities[dishId] ? state.entities[dishId].count : 0) + 1;

      state.entities[dishId] = {
        price,
        dishId,
        count,
        idfolder,
        amount: price * count
      }
      return state;
    },
    removeDish: (state, action) => {
      const removedDishId = action.payload;

      const count = state.entities[removedDishId].count === 0
      ? 0
      : state.entities[removedDishId].count - 1

      state.entities[removedDishId] = {
        price: state.entities[removedDishId].price,
        dishId: removedDishId,
        count,
      idfolder: state.entities[removedDishId].idfolder,
          amount: state.entities[removedDishId].price * count
      }
      return state;
    },
    cleanCart: (state) => {
      state.entities = initialState.entities;

      return state;
    }
  },
});

export const cartSliceActions = cartSlice.actions;

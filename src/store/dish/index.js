import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  images: {},
  status: "idle",
};

export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    startLoading: (state) => {
      return {
        ...state,
        status: "loading",
      };
    },
    successLoading: (state, action) => {
      const { data, idfolder } = action.payload;

      const {entities, ids} = data;

      state.entities[idfolder] = {
        entities, ids
      }
      state.status = "success";

      return state;
    },
    failLoading: () => {
      return {
        ...initialState,
        status: "failLoading",
      };
    },
    addImg: (state, action) => {
      const { dishId, url } = action.payload;

      state.images[dishId] = 
        (state.images[dishId] ? state.images[dishId] : url);

      return state;
    },
  },
});

export const dishesSliceActions = dishSlice.actions;

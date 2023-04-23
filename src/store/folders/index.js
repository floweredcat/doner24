import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  ids: [],
  status: "idle",
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    startLoading: (state) => {
      return {
        ...state,
        status: "loading",
      };
    },
    successLoading: (state, action) => {
      const { entities, ids, pid } = action.payload;

      state.entities[pid].folders = {
        entities, ids
      }
      state.status = "success";

      return state;
    },
    successMainLoading: (state, action) => {

        const { entities, ids } = action.payload;
        return {
          entities,
          ids,
          status: "success",
        };
    },
    failLoading: () => {
      return {
        entities: {},
        ids: [],
        status: "fail",
      };
    },
  },
});

export const foldersSliceActions = foldersSlice.actions;

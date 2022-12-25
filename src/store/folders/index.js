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
    startLoading: () => {
      return {
        entities: {},
        ids: [],
        status: "loading",
      };
    },
    successLoading: (state, action) => {
      const {entities, ids} = action.payload;
      return {
        entities,
        ids,
        status: "success"
      }
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

export const foldersSliceActions = foldersSlice.actions

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  status: "idle"
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    startLoading: () => {
      return {
        type: null,
        status: "loading",
      };
    },
    successLoading: (state, action) => {
      return {
        ...action.payload,
        status: "success",
      };
    },
    failLoading: () => {
      return {
        type: null,
        status: "fail",
      };
    },
  },
});

export const organizationSliceActions = organizationSlice.actions;

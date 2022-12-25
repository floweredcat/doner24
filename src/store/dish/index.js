import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: {},
    ids: [],
    status: "idle"
}

export const dishSlice = createSlice({
    name: "dish",
    initialState,
    reducers: {
        startLoading: () => {
            return {
                ...initialState,
                status: "loading"
            }
        },
        successLoading: (state, action) => {
            const { entities, ids } = action.payload;
      
            state.entities = entities;
            state.ids = ids;
            state.status = "success";
      
            return state;
        },
        failLoading: () => {
            return {
                ...initialState,
                status: "failLoading"
            }
        },
        addImg: (state, action) => {
            const { dishId, url } = action.payload;
            if (url.length > 23) {
                state.entities[dishId].url = url;
            }

            return state
        },
    }
})

export const dishesSliceActions = dishSlice.actions
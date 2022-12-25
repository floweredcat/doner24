import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: {},
    ids: [],
    status: "idle"
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addDish: (state, action) => {
            const addedDishId = action.payload;
        
                state.entities[addedDishId] = (state.entities[addedDishId] ? state.entities[addedDishId] : 0) + 1;
            return state
        },
        removeDish: (state, action) => {
            const removedDishId = action.payload;
            
            state.entities[removedDishId] = !state.entities[removedDishId] || state.entities[removedDishId] === 0
                    ? 0
                    : state.entities[removedDishId] - 1;
            return state
        },
        cleanCart: (state) => {
            state.entities = initialState.entities;

            return state
        }
    }
})

export const cartSliceActions = cartSlice.actions
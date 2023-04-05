export const selectDishModule = (state) => state.dish;

export const selectFolderLength = (state, {idfolder}) => selectDishModule(state).entities?.[idfolder]?.ids

export const selectDishById = (state, { dishId, idfolder }) =>
  selectDishModule(state).entities[idfolder]?.entities[dishId];

export const selectDishNameById = (state, { dishId }) =>
  selectDishById(state, { dishId })?.name;

export const selectIsDishesLoading = (state) =>
  selectDishModule(state).status === "loading";

export const selectDishes = (state) => selectDishModule(state).entities;

export const selectDishPrice = (state, { dishId }) =>
  selectDishes(state)[dishId].MCENA;

export const selectDishIdsByFolderId = (state, {id}) => selectDishModule(state).entities[id]?.ids



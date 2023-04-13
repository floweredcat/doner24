import { dishesSliceActions } from "../../dish/index";
import { selectFolderLength } from "../selectors";
import { normolizeEntities } from "../../helpers/normolizeEntities";

export const loadDishesIfNotExist = ({idsrv, idfolder}) => (dispatch, getState) => {
  if (selectFolderLength(getState(), {idfolder})?.length > 0 || !idfolder) {
    return;
  }
  const url = new URL(
    "https://menu.qr-uno.com/api/menus"
  )

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      idsrv, idfolder
    }),
  };
  dispatch(dishesSliceActions.startLoading());

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(
        dishesSliceActions.successLoading({data: normolizeEntities(data, "ID"), idfolder})
      );
    })
    .catch((err) => {
      console.log(err);
      dispatch(dishesSliceActions.failLoading());
    });
};

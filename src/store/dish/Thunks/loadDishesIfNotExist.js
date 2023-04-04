import { dishesSliceActions } from "../../dish/index";
import { selectDishIds } from "../selectors";
import { normolizeEntities } from "../../helpers/normolizeEntities";

export const loadDishesIfNotExist = ({idsrv, idfolder}) => (dispatch, getState) => {
  if (selectDishIds(getState())?.length > 0) {
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
      console.log(data)
      dispatch(
        dishesSliceActions.successLoading(normolizeEntities(data, "ID"))
      );
    })
    .catch((err) => {
      console.log(err);
      dispatch(dishesSliceActions.failLoading());
    });
};

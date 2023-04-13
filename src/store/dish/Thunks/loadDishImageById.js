import { dishesSliceActions } from "..";
import { selectDishUrlById } from "../selectors";

export const loadDishImageById =
  ({ idsrv, dishId }) =>
  (dispatch, getState) => {
    if (selectDishUrlById(getState(), {dishId})) {
      return;
    }
    const url = new URL(`https://menu.qr-uno.com/api/img/${idsrv}/${dishId}.jpg`);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response;
      })
      .then(({url}) => {
        dispatch(
          dishesSliceActions.addImg({
            dishId,
            url
          }),
          []
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

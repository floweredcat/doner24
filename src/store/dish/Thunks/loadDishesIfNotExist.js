import { dishesSliceActions } from "../../dish/index";
import { selectDishIds } from "../selectors";
import { normolizeEntities } from "../../helpers/normolizeEntities";

export const loadDishesIfNotExist = ({id}) => (dispatch, getState) => {
  if (selectDishIds(getState())?.length > 0) {
    return;
  }
  const url = new URL(
    `https://ws.1uno.kz/ws/v1/1/${id}`
  )

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "s": "select m.id,m.pid,p.name,m.mcena,m.descr,m.img from tbmenu m join d_product p on m.idproduct=p.id",
    }),
  };
  dispatch(dishesSliceActions.startLoading());

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(
        dishesSliceActions.successLoading(normolizeEntities(data, "ID"))
      );
    })
    .catch((err) => {
      console.log(err);
      dispatch(dishesSliceActions.failLoading());
    });
};

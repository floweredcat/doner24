import { dishesSliceActions } from "../../dish/index";
import { selectDishIds } from "../selectors";
import { normolizeEntities } from "../../helpers/normolizeEntities";

const url = new URL(
  "http://wsuno.xyz:5680/1/15046?s=select m.id,m.pid,p.name,m.mcena,m.descr,m.img from tbmenu m join d_product p on m.idproduct=p.id"
);

export const loadDishesIfNotExist = (dispatch, getState) => {
  if (selectDishIds(getState())?.length > 0) {
    return;
  }
  dispatch(dishesSliceActions.startLoading());

  fetch(url)
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

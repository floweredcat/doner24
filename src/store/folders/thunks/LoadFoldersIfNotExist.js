import { foldersSliceActions } from "../../folders/index";
import { selectFoldersIds } from "../selectors";
import { normolizeEntities } from "../../helpers/normolizeEntities";

const url = new URL(
  "http://wsuno.xyz:5680/1/15046?s=select id,pid,name from tbmenu where idproduct is null"
);

export const loadFoldersIfNotExist = (dispatch, getState) => {
  if (selectFoldersIds(getState())?.length > 0) {
    return;
  }
  dispatch(foldersSliceActions.startLoading());

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dispatch(foldersSliceActions.successLoading(normolizeEntities(data)));
    })
    .catch((err) => {
      console.log(err);
      dispatch(foldersSliceActions.failLoading());
    });
};

import { foldersSliceActions } from "../../folders/index";
import { selectFoldersIds } from "../selectors";
import { normolizeEntities } from "../../helpers/normolizeEntities";

export const loadFoldersIfNotExist =
  ({ id }) =>
  (dispatch, getState) => {
    if (selectFoldersIds(getState())?.length > 0) {
      return;
    }
    const url = new URL(`https://ws.1uno.kz/ws/v1/1/${id}`);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        s: "select id,pid,name from tbmenu where idproduct is null",
      }),
    };
    dispatch(foldersSliceActions.startLoading());

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(foldersSliceActions.successLoading(normolizeEntities(data)));
      })
      .catch((err) => {
        console.log(err);
        dispatch(foldersSliceActions.failLoading());
      });
  };

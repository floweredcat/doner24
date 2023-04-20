import { foldersSliceActions } from "../../folders/index";
import { selectFoldersIds } from "../selectors";
import { normolizeEntities } from "../../helpers/normolizeEntities";

export const loadMainFoldersIfNotExist =
  ({ idsrv }) =>
  (dispatch, getState) => {
    // if (selectFoldersIds(getState())?.length > 0) {
    //   return;
    // }
    const url = "https://menu.qr-uno.com/api//mainfolders";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        idsrv
        }),
    };
    dispatch(foldersSliceActions.startLoading());

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        dispatch(foldersSliceActions.successMainLoading(normolizeEntities(data)));
      })
      .catch((err) => {
        console.log(err);
        dispatch(foldersSliceActions.failLoading());
      });
  };

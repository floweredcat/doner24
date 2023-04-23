import { foldersSliceActions } from "../../folders/index";
// import { selectFoldersIds } from "../selectors";
import { normolizeEntities } from "../../helpers/normolizeEntities";

export const loadFoldersIfNotExist =
 ({ idsrv, pid }) => async (dispatch, getState) => 
   {
    // if (selectFoldersIds(getState())?.length > 0) {
    //   return;
    // }
    const url = "https://menu.qr-uno.com/api/folders";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        idsrv,
        pid
        }),
    };
    dispatch(foldersSliceActions.startLoading());
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const {entities, ids} = normolizeEntities(data)
      dispatch(foldersSliceActions.successLoading({entities, ids, pid}));
      return {entities, ids};
    } catch (err) {
      dispatch(foldersSliceActions.failLoading)
      console.log(err);
    }

    // fetch(url, options)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const {entities, ids} = normolizeEntities(data)
    //     dispatch(foldersSliceActions.successLoading({entities, ids, pid}));
    //     return ids[0]
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     dispatch(foldersSliceActions.failLoading());
    //   });
  };

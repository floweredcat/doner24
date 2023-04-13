import { organizationSliceActions } from "..";

export const getOrgInfo = ({idsrv}) => (dispatch) => {

  const url = new URL(
    "https://menu.qr-uno.com/api/orgparams"
  )

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      idsrv
    }),
  };
  
  dispatch(organizationSliceActions.startLoading())

  fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    dispatch(organizationSliceActions.successLoading(data[0]));
  })
  .catch((err) => {
    console.log(err);
    dispatch(organizationSliceActions.failLoading());
  });
};
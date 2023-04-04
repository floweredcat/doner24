import { dishesSliceActions } from "..";

export const loadDishImageById =
  ({ id, dishId }) =>
  (dispatch) => {
    const url = new URL(`https://ws.1uno.kz/ws/v1/1/${id}`);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        s: `select img from tbmenu where id=${dishId}`,
      }),
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        dispatch(
          dishesSliceActions.addImg({
            dishId,
            url: `data:image/jpeg;base64,${data.toString("base64")}`,
          }),
          []
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

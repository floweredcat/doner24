export const getIsOrderAviable = ({idsrv, type, value}) => async () => {

  const url = new URL(
    "https://menu.qr-uno.com/api/check"
  )

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      idsrv, type, val: value
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data
  } catch (err) {
    console.log(err);
  }
};

export const addRemote = async (props) => {

  const url = new URL(
    "https://menu.qr-uno.com/api/addremote"
  ) 

//   {"idsrv": int,
// "isdelivery":bool,
//  "raion": str,
//  "dom": str,
//  "pd": int,
//  "kv": str,
//  "et": int,
//  "name": str,
//  "phone": str,
//  "comments": str,
//  "items": [
//      {"idmenu": int, "klv": int},
//    {"idmenu": int, "klv": int}
//  ]} = props

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(props),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data
  } catch (err) {
    console.log(err);
  }
};
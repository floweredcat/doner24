export const addLocale = ({idsrv, uid, items}) => {

    const url = new URL(
      "https://menu.qr-uno.com/api/addlocale"
    )
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        idsrv,
        uid, 
        items
      }),
    };
  
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
        
      });
  
};

// /addlocale
// body:{
// "idsrv": int,
// "uid": str,
// "items": [
// {"idmenu": int, "klv": int }, ...
// ]
// }
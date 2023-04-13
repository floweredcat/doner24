export const addLocale = async ({idsrv, uid, items}) => {

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
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data
    } catch (err) {
      console.log(err);
    }
};
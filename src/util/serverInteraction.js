export const fetchJSON = (path) => {
  const p = fetch(path)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      console.log("fetch 1", res);
      return res;
    })
    .then((res) => {
      console.log("fetch 2", res);
      return res.json()
    });
  return p;
};

export const fetchData = async () => {
  const data = await fetch(`http://localhost:6554/api/products`);
  const aa = await data.json();
  return aa;
};

export const addOne = async (url, id) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

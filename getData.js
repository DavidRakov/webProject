export const fetchData = async () => {
  const data = await fetch(`https://webservis.onrender.com/api/products`);
  data = await data.json();
  return data;
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

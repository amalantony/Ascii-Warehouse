import fetch from "isomorphic-fetch";

export const fetchProducts = (sort = "id", skip = 0, limit = 11) => {
  const queryParams = "?sort=" + sort + "&skip=" + skip + "&limit=" + limit;
  return fetch("/api/products" + queryParams)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      const lines = text.trim().split("\n");
      const products = lines.map(lineStr => JSON.parse(lineStr));
      return products;
    });
};

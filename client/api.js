import fetch from "isomorphic-fetch";

export const fetchProducts = (sort = "id", skip = 0, limit = 11) => {
  const queryParams = "?sort=" + sort + "&skip=" + skip + "&limit=" + limit;
  return fetch("/api/products" + queryParams)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      if (text.length === 0) return [];
      const lines = text.trim().split("\n");
      const products = lines.map(lineStr => {
        return JSON.parse(lineStr);
      });
      return products; // errors are resolved in sagas
    });
};

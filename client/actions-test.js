import expect from "expect";

import {
  loadProducts,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  changeProductsFilter,
  catalogEnd,
  createAd
} from "./actions.js";

expect(loadProducts()).toEqual({
  type: "LOAD_PRODUCTS"
});

expect(fetchProductsRequest({ sort: "id", skip: 10, limit: 20 })).toEqual({
  type: "FETCH_PRODUCTS_REQUEST",
  options: {
    sort: "id",
    skip: 10,
    limit: 20
  },
  initialLoad: false
});

expect(
  fetchProductsSuccess(
    [{ foo: "baz" }],
    { sort: "size", skip: 10, limit: 20 },
    false
  )
).toEqual({
  type: "FETCH_PRODUCTS_SUCCESS",
  items: [{ foo: "baz" }],
  options: {
    sort: "size",
    skip: 10,
    limit: 20
  },
  initialLoad: false
});

expect(fetchProductsFailure(new Error("ERR_TEST"))).toEqual({
  type: "FETCH_PRODUCTS_FAILURE",
  error: new Error("ERR_TEST")
});

expect(changeProductsFilter()).toEqual({
  type: "CHANGE_PRODUCTS_FILTER"
});

expect(catalogEnd()).toEqual({
  type: "CATALOG_END"
});

expect(createAd()).toEqual({
  type: "CREATE_AD"
});

console.log("Actions tests passed!");

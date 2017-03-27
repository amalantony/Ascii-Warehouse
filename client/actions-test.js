import expect from "expect";

import {
  loadProducts,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  changeProductsFilter,
  catalogEnd,
  fetchAdRequest,
  fetchAdFailure,
  fetchAdSuccess
} from "./actions.js";

expect(loadProducts()).toEqual({
  type: "LOAD_PRODUCTS"
});

expect(fetchProductsRequest({ sort: "id", skip: 10, limit: 20 })).toEqual({
  type: "FETCH_PRODUCTS_REQUEST",
  filter: {
    sort: "id",
    skip: 10,
    limit: 20
  },
  initialLoad: false
});

expect(fetchProductsSuccess([{ foo: "baz" }], false)).toEqual({
  type: "FETCH_PRODUCTS_SUCCESS",
  items: [{ foo: "baz" }],
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

expect(fetchAdRequest()).toEqual({
  type: "FETCH_AD_REQUEST"
});

expect(fetchAdFailure()).toEqual({
  type: "FETCH_AD_FAILURE"
});

expect(fetchAdSuccess()).toEqual({
  type: "FETCH_AD_SUCCESS"
});

console.log("Actions tests passed!");

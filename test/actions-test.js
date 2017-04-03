import expect from "expect";

import {
  loadProducts,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  changeProductsFilter,
  catalogEnd,
  createAd
} from "../client/actions.js";

describe("In Actions,", () => {
  it("loadProducts() must return the LOAD_PRODUCTS action", () => {
    expect(loadProducts()).toEqual({
      type: "LOAD_PRODUCTS"
    });
  });

  it("fetchProductsRequest() must return the FETCH_PRODUCTS_REQUEST action", () => {
    expect(fetchProductsRequest({ sort: "id", skip: 10, limit: 20 })).toEqual({
      type: "FETCH_PRODUCTS_REQUEST",
      options: {
        sort: "id",
        skip: 10,
        limit: 20
      },
      initialLoad: false
    });
  });

  it("fetchProductsSuccess() must return the fetchProductsSuccess action", () => {
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
  });

  it("fetchProductsFailure() must return the FETCH_PRODUCTS_FAILURE action", () => {
    expect(fetchProductsFailure(new Error("ERR_TEST"))).toEqual({
      type: "FETCH_PRODUCTS_FAILURE",
      error: new Error("ERR_TEST")
    });
  });

  it("changeProductsFilter() must return the CHANGE_PRODUCTS_FILTER action", () => {
    expect(changeProductsFilter()).toEqual({
      type: "CHANGE_PRODUCTS_FILTER"
    });
  });

  it("catalogEnd() must return the CATALOG_END action", () => {
    expect(catalogEnd()).toEqual({
      type: "CATALOG_END"
    });
  });

  it("createAd() must return the CREATE_AD action", () => {
    expect(createAd()).toEqual({
      type: "CREATE_AD"
    });
  });
});

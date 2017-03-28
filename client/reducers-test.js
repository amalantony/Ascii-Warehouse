import expect from "expect";

import {
  LOAD_PRODUCTS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_PRODUCTS_FILTER,
  CATALOG_END,
  FETCH_AD_REQUEST,
  FETCH_AD_FAILURE,
  FETCH_AD_SUCCESS
} from "./actions.js";

import { products, ads } from "./reducers.js";

/* 
* TODO: Account for how the value of running count will change
*/
expect(
  products(
    {
      isFetching: false,
      items: [{ foo: "baz" }],
      prefetchedItems: [{ joo: "jaz" }],
      runningCount: 0
    },
    {
      type: LOAD_PRODUCTS
    }
  )
).toEqual({
  isFetching: false,
  items: [{ foo: "baz" }, { joo: "jaz" }],
  prefetchedItems: [],
  runningCount: 0
});

expect(
  products(
    {
      isFetching: false,
      items: [{ foo: "baz" }],
      prefetchedItems: []
    },
    {
      type: FETCH_PRODUCTS_REQUEST
    }
  )
).toEqual({
  isFetching: true,
  items: [{ foo: "baz" }],
  prefetchedItems: []
});

expect(
  products(
    {
      isFetching: false,
      isCatalogEnd: false,
      items: [{ foo: "baz" }],
      prefetchedItems: []
    },
    {
      type: CATALOG_END
    }
  )
).toEqual({
  isFetching: false,
  isCatalogEnd: true,
  items: [{ foo: "baz" }],
  prefetchedItems: []
});

expect(
  products(
    {
      isFetching: true,
      items: [{ foo: "baz" }],
      isCatalogEnd: false,
      prefetchedItems: []
    },
    {
      type: FETCH_PRODUCTS_SUCCESS,
      options: {
        sort: "id",
        skip: 10,
        limit: 20
      },
      items: [{ joo: "jaz" }]
    }
  )
).toEqual({
  isFetching: false,
  isCatalogEnd: false,
  queryParams: {
    sort: "id",
    skip: 10,
    limit: 20
  },
  items: [{ foo: "baz" }],
  prefetchedItems: [{ joo: "jaz" }]
});

expect(
  products(
    {
      isFetching: true,
      items: [{ foo: "baz" }],
      isCatalogEnd: true,
      prefetchedItems: []
    },
    {
      type: FETCH_PRODUCTS_SUCCESS,
      items: [{ joo: "jaz" }],
      options: {
        sort: "size",
        skip: 10,
        limit: 20
      }
    }
  )
).toEqual({
  isFetching: false,
  isCatalogEnd: false,
  items: [{ foo: "baz" }],
  prefetchedItems: [{ joo: "jaz" }],
  queryParams: {
    sort: "size",
    skip: 10,
    limit: 20
  }
});

/*
*   TODO: Update the test with the error assignment with the error passed on failure to fetch
*/
expect(
  products(
    {
      isFetching: true,
      items: [{ foo: "baz" }],
      prefetchedItems: []
    },
    {
      type: FETCH_PRODUCTS_FAILURE
    }
  )
).toEqual({
  isFetching: false,
  items: [{ foo: "baz" }],
  prefetchedItems: []
});

// expect(
//   changeFilter("SORT_BY_ID", {
//     type: CHANGE_PRODUCTS_FILTER,
//     filter: "SORT_BY_SIZE"
//   })
// ).toEqual("SORT_BY_SIZE");

console.log("Reducers test passed!");

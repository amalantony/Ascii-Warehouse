import expect from "expect";

import {
  LOAD_PRODUCTS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_PRODUCTS_FILTER,
  CATALOG_END,
  CREATE_AD
} from "../client/actions.js";

import { products, ads } from "../client/reducers.js";

describe("In Reducers,", () => {
  describe("product reducer", () => {
    it("must load prefectedItems[] to items[] on LOAD_PRODUCTS", () => {
      expect(
        products(
          {
            isFetching: true,
            items: [{ foo: "baz" }],
            prefetchedItems: [{ joo: "jaz" }]
          },
          {
            type: LOAD_PRODUCTS
          }
        )
      ).toEqual({
        isFetching: true,
        items: [{ foo: "baz" }, { joo: "jaz" }],
        prefetchedItems: []
      });
    });

    it("must set isFetching to true and isCatalogEnd to false on getting a FETCH_PRODUCTS_REQUEST action", () => {
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
        isCatalogEnd: false,
        items: [{ foo: "baz" }],
        prefetchedItems: []
      });
    });

    it("must set isFetching to false and isCatalogEnd to true on CATALOG_END action", () => {
      expect(
        products(
          {
            isFetching: true,
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
    });

    it("must reset the queryParams to the new values in the action on FETCH_PRODUCTS_SUCCESS", () => {
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
        isFetching: true,
        isCatalogEnd: false,
        queryParams: {
          sort: "id",
          skip: 10,
          limit: 20
        },
        items: [{ foo: "baz" }],
        prefetchedItems: [{ joo: "jaz" }]
      });
    });

    it("must load items in a FETCH_PRODUCTS_SUCCESS action to the prefetchedItems array", () => {
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
        isFetching: true,
        isCatalogEnd: false,
        items: [{ foo: "baz" }],
        prefetchedItems: [{ joo: "jaz" }],
        queryParams: {
          sort: "size",
          skip: 10,
          limit: 20
        }
      });
    });

    it("must set isFetching to false on a FETCH_PRODUCTS_FAILURE action", () => {
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
    });

    it("must reset the initial state and queryParams on a CHANGE_PRODUCTS_FILTER action", () => {
      expect(
        products(
          {
            isFetching: true,
            isCatalogEnd: false,
            items: [{ foo: "baz" }],
            prefetchedItems: [{ joo: "jaz" }],
            queryParams: {
              sort: "id",
              skip: 30,
              limit: 15
            }
          },
          { type: CHANGE_PRODUCTS_FILTER, value: "size" }
        )
      ).toEqual({
        isFetching: true,
        isCatalogEnd: false,
        items: [],
        prefetchedItems: [],
        queryParams: {
          sort: "size",
          skip: 0,
          limit: 23
        }
      });
    });
  });

  describe("ads reducer", () => {
    it("must create a new ad on a CREATE_AD action", () => {
      const oldState = [123];
      const newState = ads(oldState, { type: CREATE_AD });
      expect(newState.length).toEqual(oldState.length + 1);
    });
    it("must return the initial state with a single ad on CHANGE_PRODUCTS_FILTER", () => {
      const oldState = [1234, 2345, 3456];
      const newState = ads(oldState, { type: CHANGE_PRODUCTS_FILTER });
      expect(newState.length).toEqual(1);
    });
  });
});

import { combineReducers } from "redux";
import deepFreeze from "deep-freeze";
import { ignoreActions, filterActions } from "redux-ignore";

import {
  LOAD_PRODUCTS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  CHANGE_PRODUCTS_FILTER,
  CATALOG_END,
  CREATE_AD
} from "./actions.js";

export const products = (
  state = {
    isFetching: true, // hide spinner only when catalog has ended
    isCatalogEnd: false,
    items: [],
    prefetchedItems: [],
    queryParams: {
      sort: "id",
      skip: 0,
      limit: 23
    }
  },
  action
) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true,
        items: [...state.items, ...state.prefetchedItems],
        prefetchedItems: []
      });

    case FETCH_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isCatalogEnd: false
      });

    case FETCH_PRODUCTS_FAILURE:
      /*
     * TODO: show the approriate error (perhaps have a property on state)
     */
      return Object.assign({}, state, {
        isFetching: false
      });

    case FETCH_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isCatalogEnd: false,
        queryParams: {
          sort: action.options.sort,
          skip: action.options.skip,
          limit: action.options.limit
        },
        prefetchedItems: action.items
      });

    case CATALOG_END:
      return Object.assign({}, state, {
        isCatalogEnd: true,
        isFetching: false
      });

    case CHANGE_PRODUCTS_FILTER:
      let newState = Object.assign({}, state, {
        isFetching: true,
        isCatalogEnd: false,
        items: [],
        prefetchedItems: []
      });
      newState.queryParams = {
        // Object.assign does not copy nested objects
        sort: action.value,
        skip: 0,
        limit: 23
      };
      return newState;

    default:
      return state;
  }
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const ads = (
  state = [getRandomInt(100000000000, 999999999999)],
  action
) => {
  const r = getRandomInt(100000000000, 999999999999); // generate an r large enough to avoid ad collisions
  switch (action.type) {
    case CREATE_AD:
      return [...state, r];
    case CHANGE_PRODUCTS_FILTER:
      return [r];
    default:
      return state;
  }
};

export default combineReducers({
  products: ignoreActions(products, [CREATE_AD]), // no need to call the product reducer on CREATE_AD actions
  ads: filterActions(ads, [CREATE_AD, CHANGE_PRODUCTS_FILTER])
});

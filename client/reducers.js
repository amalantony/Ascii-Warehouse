import { combineReducers } from "redux";
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

const defaultLimit = 23;
const defaultSkip = 0;

export const products = (
  state = {
    isFetching: true, // hide spinner only when catalog has ended
    isCatalogEnd: false,
    items: [],
    prefetchedItems: [],
    queryParams: {
      // Set of params based on which product fetch queries must be executed
      sort: "id",
      skip: defaultSkip,
      limit: defaultLimit
    }
  },
  action
) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return Object.assign({}, state, {
        isFetching: true,
        items: [...state.items, ...state.prefetchedItems], // merge prefetched products to products
        prefetchedItems: []
      });

    case FETCH_PRODUCTS_REQUEST:
      // show the spinner on a fetch products request
      return Object.assign({}, state, {
        isFetching: true,
        isCatalogEnd: false
      });

    case FETCH_PRODUCTS_FAILURE:
      // hide the spinner when a fetch products request failed
      return Object.assign({}, state, {
        isFetching: false
      });

    case FETCH_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isCatalogEnd: false,
        queryParams: {
          // on every fetch sucess, reset the query params for the next fetch
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
        skip: defaultSkip,
        limit: defaultLimit
      };
      return newState;

    default:
      return state;
  }
};

// 12 digit range for random numbers for the value of 'r' in adverts (this will make collisions less likely)
const RANDOM_MIN = 100000000000;
const RANDOM_MAX = 999999999999;

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const ads = (state = [getRandomInt(RANDOM_MIN, RANDOM_MAX)], action) => {
  const r = getRandomInt(RANDOM_MIN, RANDOM_MAX);
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

import { combineReducers } from "redux";
import deepFreeze from "deep-freeze";

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
  console.log("Got action type:", action.type);
  /* TODO: remove the deepFreeze */
  deepFreeze(state); // state & action must be immutable
  deepFreeze(action);
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

export const ads = (
  state = {
    previousAdId: 0,
    items: []
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  products,
  ads
});

import { combineReducers } from "redux";

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
    isFetching: false,
    isCatalogEnd: false,
    items: [],
    prefetchedItems: [],
    queryParams: {
      sort: "id",
      skip: 0,
      limit: 15
    }
  },
  action
) => {
  console.log("Got action type:", action.type);
  switch (action.type) {
    case LOAD_PRODUCTS:
      return Object.assign({}, state, {
        items: [...state.items, ...state.prefetchedItems],
        prefetchedItems: []
      });

    case FETCH_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
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
        isFetching: false,
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
        isCatalogEnd: true
      });

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

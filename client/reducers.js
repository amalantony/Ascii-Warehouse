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
    runningCount: 0
  },
  action
) => {
  console.log("Got action type:", action.type);
  switch (action.type) {
    case LOAD_PRODUCTS:
      /*
     *   TODO: LOAD_PRODUCTS must load ads (Actually I think this should belong as a selector inside the component, not here!)
     *      Involves dealing with runningCount, also merge the common functionality of LOAD_PRODUCTS with that of inital Load from 
     *      FETCH_PRODUCTS_REQUEST (consider the 2 options below):
     *        - Have a determineRunningCount() method that accounts for ads etc in state.items to computer the running count & 
     *        - another method that does merging state.items & state.prefetchedItems with ads in between. This functionality might belong 
     *          to a selector with a library like react reselect, not sure though.
     */
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
      if (action.initialLoad) {
        return Object.assign({}, state, {
          isFetching: false,
          isCatalogEnd: false,
          items: action.items,
          runningCount: state.runningCount + action.items.length
        });
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          isCatalogEnd: false,
          prefetchedItems: action.items
        });
      }
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
  }
};

export const changeFilter = (state = "SORT_BY_ID", action) => {
  switch (action.type) {
    case CHANGE_PRODUCTS_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default combineReducers({
  products,
  changeFilter
});

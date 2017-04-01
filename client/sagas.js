import "babel-polyfill";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { fetchProducts } from "./api.js";
import {
  /* Action Creators */
  initialiseApp,
  initialiseFailure,
  initialiseSuccess,
  fetchProductsRequest,
  fetchProductsSuccess,
  catalogEnd,
  fetchProductsFailure,
  loadProducts,
  createAd,
  /* Actions */
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS,
  CHANGE_PRODUCTS_FILTER,
  CREATE_AD
} from "./actions.js";

const createProductFetch = function*(action) {
  try {
    const items = yield call(
      fetchProducts,
      action.options.sort,
      action.options.skip,
      action.options.limit
    );
    if (items.length > 0) {
      // server returned data, dispatch a FETCH_PRODUCTS_SUCCESS action.
      yield put(
        fetchProductsSuccess(
          items,
          {
            sort: action.options.sort,
            skip: action.options.skip,
            limit: action.options.limit
          },
          action.initialLoad
        )
      );
      if (action.initialLoad) {
        // Dispatch a LOAD_PRODUCTS action right away for initial data load (don't wait for scrollToBottom)
        yield put(loadProducts());
      }
    } else {
      // server returned no data, dipatch a CATALOG_END action.
      yield put(catalogEnd());
    }
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
};

const getQueryParams = state => state.products.queryParams;

const createProductRequest = function*(isFilterChange) {
  let queryParams = yield select(getQueryParams);
  let skip;
  if (isFilterChange === true) {
    // if it's a filterChange, the request is an initial request, so don't skip any results
    skip = 0;
  } else {
    skip = queryParams.skip + queryParams.limit;
  }
  // using Object.assign to avoid mutations on queryParams
  queryParams = Object.assign({}, queryParams, {
    skip
  });
  if (isFilterChange !== true) isFilterChange = false; // isFilterChange can have arbitary values (takeEvery documentation)
  yield put(fetchProductsRequest(queryParams, isFilterChange));
};

const createAdvert = function*() {
  yield put(createAd());
};

export function* productSaga() {
  // handle every FETCH_PRODUCTS_REQUEST by dispatching either a FETCH_PRODUCTS_SUCCESS or FETCH_PRODUCTS_FAILURE depending on the outcome
  yield takeEvery(FETCH_PRODUCTS_REQUEST, createProductFetch);

  // for every LOAD_PRODUCTS, dispatch a FETCH_PRODUCTS_REQUEST for pre-emptive fetching
  yield takeEvery(LOAD_PRODUCTS, createProductRequest);

  // when a CHANGE_PRODUCTS_FILTER is dipsatched, treat it as an inital data load
  yield takeEvery(CHANGE_PRODUCTS_FILTER, createProductRequest, true);

  yield takeEvery(LOAD_PRODUCTS, createAdvert);
}

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
  /* Actions */
  FETCH_PRODUCTS_REQUEST,
  LOAD_PRODUCTS
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
      yield put(catalogEnd());
    }
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
};

const getQueryParams = state => state.products.queryParams;

const createProductRequest = function*() {
  let queryParams = yield select(getQueryParams);
  queryParams = Object.assign({}, queryParams, {
    skip: queryParams.skip + queryParams.limit
  });
  yield put(fetchProductsRequest(queryParams));
};

export function* productSaga() {
  // handle every FETCH_PRODUCTS_REQUEST by dispatching either a FETCH_PRODUCTS_SUCCESS or FETCH_PRODUCTS_FAILURE depending on the outcome
  yield takeEvery(FETCH_PRODUCTS_REQUEST, createProductFetch);

  // for every LOAD_PRODUCTS, dispatch a FETCH_PRODUCTS_REQUEST for pre-emptive fetching
  yield takeEvery(LOAD_PRODUCTS, createProductRequest);
}

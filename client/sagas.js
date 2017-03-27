import "babel-polyfill";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchProducts } from "./api.js";
import {
  // action creators
  initialiseApp,
  initialiseFailure,
  initialiseSuccess,
  fetchProductsSuccess,
  catalogEnd,
  fetchProductsFailure,
  // actions
  FETCH_PRODUCTS_REQUEST
} from "./actions.js";

const productFetch = function*(action) {
  try {
    const items = yield call(
      fetchProducts,
      action.filter.sort,
      action.filter.skip,
      action.filter.limit
    );
    if (items.length > 0)
      yield put(fetchProductsSuccess(items, action.initialLoad));
    else
      yield put(catalogEnd());
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
};

export function* productSaga() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, productFetch);
}

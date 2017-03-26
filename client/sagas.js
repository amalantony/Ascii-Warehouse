import { call, put, takeEvery } from "redux-saga/effects";
import { fetchProducts } from "./api.js";

function* fetchProducts(action) {
  try {
    const products = yield call(
      fetchProducts,
      action.sort,
      action.limit,
      action.skip
    );
    /*
            if products[] length > 0
                yield put FETCH_PRODUCTS_SUCESS
            else 
                yield put CATALOG_END
        */
  } catch (e) {
    //     yield put FETCH_PRODUCTS_FAILURE
  }
}

function* productSaga() {
  yield takeEvery("FETCH_PRODUCTS_REQUEST", fetchProducts);
}

export default productSaga;

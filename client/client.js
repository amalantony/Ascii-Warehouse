/* 
*
* TODO: Remove these tests and move them to a test runner!
*
*/
import "./actions-test.js";
import "./reducers-test.js";
import { AsciiWareHouseApp } from "./components.js";
import reducer from "./reducers.js";
import { productSaga } from "./sagas.js";
import { fetchProductsRequest } from "./actions.js";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(productSaga);

ReactDOM.render(
  <AsciiWareHouseApp store={store} />,
  document.getElementById("root")
);

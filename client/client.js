/* 
*
* TODO: Remove these tests and move them to a test runner!
*
*/

import { AsciiWareHouseApp } from "./components/AsciiWareHouseApp.jsx";
import reducer from "./reducers.js";
import { productSaga } from "./sagas.js";
import { fetchProductsRequest } from "./actions.js";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

/* TODO: REMOVE THIS */
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(productSaga);

ReactDOM.render(
  <Provider store={store}>
    <AsciiWareHouseApp />
  </Provider>,
  document.getElementById("root")
);

import { AsciiWareHouseApp } from "./components/AsciiWareHouseApp.jsx";
import reducer from "./reducers.js";
import { productSaga } from "./sagas.js";
import { fetchProductsRequest } from "./actions.js";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(productSaga);

ReactDOM.render(
  <Provider store={store}>
    <AsciiWareHouseApp />
  </Provider>,
  document.getElementById("root")
);

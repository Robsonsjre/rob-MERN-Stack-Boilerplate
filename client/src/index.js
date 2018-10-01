import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";

// Create store:
// 1) argument: Reducers
// 2) not got yet, i think something to server side render
// 3) Middlewares, redux thunk and saga enters here
const store = createStore(() => [], {}, applyMiddleware());

// Envolve the first top component with provider to give access to store from
//all components and pass store as a props.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root") //Id root at index.html
);

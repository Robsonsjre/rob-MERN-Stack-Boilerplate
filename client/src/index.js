import "materialize-css/dist/css/materialize.min.css"
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware, connectRouter, ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import reduxThunk from 'redux-thunk'
import axios from 'axios';
import App from "./components/App";
import { createRootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
// Create store:
// 1) argument: Reducers
// 2) not got yet, i think something to server side render
// 3) Middlewares, redux thunk and saga enters here
const history = createBrowserHistory();

const initialState = {}
const store = createStore(
  createRootReducer(history),
  initialState,
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(reduxThunk)
  )
);
window.axios = axios;
// Envolve the first top component with provider to give access to store from
//all components and pass store as a props.
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector("#root") //Id root at index.html
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('ENVIROMENT IS', process.env.NODE_ENV);

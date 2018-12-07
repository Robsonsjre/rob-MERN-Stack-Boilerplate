import { combineReducers } from "redux";
import { reducer as reduxForm } from 'redux-form';
import { connectRouter } from "connected-react-router";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";

//redux-form need to be assigned to the key 'form'
export const createRootReducer = (history) => combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveyReducer,
  router: connectRouter(history)
});

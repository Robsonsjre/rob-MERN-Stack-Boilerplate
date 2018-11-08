import axios from "axios";
import { FETCH_USER, HANDLE_PAYMENT, CHANGE_INPUT, CREATE_SURVEY, FETCH_SURVEY } from "./types";

// export const fetchUser = () => {
//   console.log("entrou fetchUser");
//   return dispatch => {
//     axios.get("/api/teste").then(res => {
//       console.log("veio a resposta");
//       console.log(dispatch);
//       dispatch({ type: FETCH_USER, payload: res });
//     });
//   };
// };

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/teste");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  console.log('res', res)
  dispatch({ type: FETCH_SURVEY, payload: res.data });
};

export const handleToken = token => async dispatch => {
  console.log("token", token);
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleInput = (type, value) => {
  console.log("action 1 -  handleInput");
  return { type: CHANGE_INPUT, payload: { type, value } };
};

export const createSurvey = (values, history) => async dispatch => {
  console.log('createSurvey action')
  //send email
  const res = await axios.post("/api/surveys", values)
  console.log('res', res)
  history.push('/surveys')
  dispatch({ type: CREATE_SURVEY, payload: res })
}

// export const fetchUser = (a, b) => {
//   console.log("entrou fetchUser 222")
//   console.log('primeiro argumento')
//   console.log(a)
//   return { type: FETCH_USER, payload: 'res' }
// };

import axios from "axios";
import { FETCH_USER, HANDLE_PAYMENT } from "./types";

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
    const res = await axios.get("/api/teste")

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    console.log('token', token)
    const res = await axios.post("/api/stripe", token)

    dispatch({ type: FETCH_USER, payload: res.data });
};

// export const fetchUser = (a, b) => {
//   console.log("entrou fetchUser 222")
//   console.log('primeiro argumento')
//   console.log(a)
//   return { type: FETCH_USER, payload: 'res' }
// };

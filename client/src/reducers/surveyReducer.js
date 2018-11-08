import { FETCH_SURVEY } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_SURVEY:
      return action.payload;
    default:
      return state;
  }
}

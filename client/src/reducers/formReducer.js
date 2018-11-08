import { CHANGE_INPUT, CREATE_SURVEY, FETCH_SURVEY } from '../actions/types'

export default function(state = {}, action) {
  console.log('action.type')
  console.log(action.type)
  switch (action.type) {
    case CHANGE_INPUT :
      state[action.payload.type] = action.payload.value
      console.log('state', state)
      return state;
      break;
    case CREATE_SURVEY:
    console.log('CREATE_SURVEY')
    return state;
    break;
    
    default:
      return state;
  }
}

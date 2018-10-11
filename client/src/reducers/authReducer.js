import { FETCH_USER } from '../actions/types'

export default function(state = null, action) {
  console.log('action', action.payload)
  console.log('state', state)
  console.log('BOLSONAZI')
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false

    default:
      return state;
  }
}

import { 
  RECEIVE_WRESTLER
} from '../actions/wrestler_actions';

const initialState = {};

export default function(state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {

    case RECEIVE_WRESTLER:
      const id = action.wrestler.webId
      return Object.assign({}, state, {[id]: action.wrestler})
    
    default:
      return state;
  }
}
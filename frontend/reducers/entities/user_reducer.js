import { RECEIVE_USER } from '../../actions/session_action';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER:
      action.user.id = parseInt(action.user.id);
      return Object.assign({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
};

export default usersReducer;

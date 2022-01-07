import { RECEIVE_USER, REMOVE_USER } from '../../actions/session_action';

const usersReducer = (prevState = {}, action) => {
  Object.freeze(prevState);
  let newState = Object.assign({}, prevState);
  switch(action.type) {
    case RECEIVE_USER:
      action.user.id = parseInt(action.user.id);
      newState = {...newState, ...action.user}
      return newState;
    case REMOVE_USER:
      return {};
    default:
      return prevState;
  }
};

export default usersReducer;

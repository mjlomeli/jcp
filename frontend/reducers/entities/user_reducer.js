import { RECEIVE_USER, REMOVE_USER } from '../../actions/session_action';
import {RECEIVE_USER_REVIEWS} from "../../actions/review_action";

const usersReducer = (prevState = {reviews: {}}, action) => {
  Object.freeze(prevState);
  let newState = Object.assign({}, prevState);
  switch(action.type) {
    case RECEIVE_USER:
      action.user.id = parseInt(action.user.id);
      newState = {...newState, ...action.user}
      return newState;
    case REMOVE_USER:
      return {reviews: {}};
    case RECEIVE_USER_REVIEWS:
      newState.reviews = {...newState.reviews, ...action.reviews};
      return newState;
    default:
      return prevState;
  }
};

export default usersReducer;

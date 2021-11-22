import {
    RECEIVE_USER,
    RECEIVE_SESSION,
    REMOVE_SESSION,
} from '../actions/session_actions';


export default function SessionReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState);
    switch(action.type){
        case RECEIVE_USER:
            return newState;
        case RECEIVE_SESSION:
            return newState;
        case REMOVE_SESSION:
            return newState;
        default:
            return prevState;
    }
}
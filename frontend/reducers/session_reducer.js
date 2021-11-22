import {
    RECEIVE_USER,
    REMOVE_SESSION,
    RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';

const _nullUser = Object.freeze({
    id: null
});

export default function SessionReducer(prevState=_nullUser, action){
    Object.freeze(prevState);
    switch(action.type){
        case RECEIVE_USER:
            return { id: action.user.id };
        case REMOVE_SESSION:
            return _nullUser;
        default:
            return prevState;
    }
}
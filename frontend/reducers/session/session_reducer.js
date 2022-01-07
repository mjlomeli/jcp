import {
    RECEIVE_USER,
    REMOVE_SESSION
} from '../../actions/session_action';

const _nullUser = Object.freeze({
    id: null
});

export default function SessionReducer(prevState=_nullUser, action){
    Object.freeze(prevState);
    switch(action.type){
        case RECEIVE_USER:
            return {...prevState, ...action.user};
        case REMOVE_SESSION:
            return _nullUser;
        default:
            return prevState;
    }
}
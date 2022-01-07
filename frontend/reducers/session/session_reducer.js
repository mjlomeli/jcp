import {
    RECEIVE_SESSION,
    REMOVE_SESSION
} from '../../actions/session_action';

const _nullUser = Object.freeze({
    id: null
});

export default function SessionReducer(prevState=_nullUser, action){
    Object.freeze(prevState);
    switch(action.type){
        case RECEIVE_SESSION:
            return {...prevState, ...{id: parseInt(action.userId)}};
        case REMOVE_SESSION:
            return _nullUser;
        default:
            return prevState;
    }
}
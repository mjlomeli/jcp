
import {
    RECEIVE_ALERT,
    REMOVE_ALERT
} from "../../actions/alert_action";

export default function AlertReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState)
    switch(action.type){
        case RECEIVE_ALERT:
            return {...action.alert, timeoutId: action.timeoutId};
        case REMOVE_ALERT:
            return {};
        default:
            return prevState
    }
}


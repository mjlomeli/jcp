import {combineReducers} from 'redux';
import SessionReducer from "./session_reducer";
import SessionErrorReducer from "./session_errors_reducer"

const rootReducer = combineReducers({
    session: SessionReducer,
    sessionError: SessionErrorReducer
});

export default rootReducer;
import {combineReducers} from 'redux';
import SessionReducer from "./session_reducer";
import SessionErrorReducer from "./session_errors_reducer"

import entities from './entities_reducer';
import ui from './ui_reducer';

const rootReducer = combineReducers({
    session: SessionReducer,
    sessionError: SessionErrorReducer,
    entities,
    ui
});

export default rootReducer;
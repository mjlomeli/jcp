import {combineReducers} from 'redux';

import session from "./session/session_reducer";
import entities from './entities_reducer';
import ui from './ui_reducer';
import errors from './errors_reducer'

const rootReducer = combineReducers({
    session,
    entities,
    ui,
    errors
});

export default rootReducer;
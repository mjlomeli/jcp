import {combineReducers} from 'redux';

import session from "./session/session_reducer";
import entities from './entities_reducer';
import ui from './ui_reducer';
import errors from './errors_reducer'
import index from './index_reducer'

const rootReducer = combineReducers({
    session,
    entities,
    ui,
    index,
    errors
});

export default rootReducer;
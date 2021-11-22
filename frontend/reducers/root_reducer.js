import {combineReducers} from 'redux';
import SessionReducer from "./session_reducer";

import entities from './entities_reducer';
import ui from './ui_reducer';
import errors from './errors_reducer'

const rootReducer = combineReducers({
    session: SessionReducer,
    entities,
    //ui,
    errors
});

export default rootReducer;
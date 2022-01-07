import { combineReducers } from 'redux';
import alert from './ui/alert_reducer'
import {modalReducer} from './ui/modal_reducer'

export default combineReducers({
    alert,
    modal: modalReducer
});

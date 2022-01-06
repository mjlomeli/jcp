import { combineReducers } from 'redux';
import userControl from './ui/user_controls_reducers'
import theme from './ui/themes_reducers'
import page from './ui/pages_reducer'
import alert from './ui/alert_reducer'
import {modalReducer} from './ui/modal_reducer'

export default combineReducers({
    userControl,
    theme,
    page,
    alert,
    modal: modalReducer
});

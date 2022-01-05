import { combineReducers } from 'redux';
import userControl from './ui/user_controls_reducers'
import theme from './ui/themes_reducers'
import page from './ui/pages_reducer'
import alerts from './ui/alert_reducer'

export default combineReducers({
    userControl,
    theme,
    page,
    alerts
});

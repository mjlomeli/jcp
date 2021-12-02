import { combineReducers } from 'redux';

import sessionErrors from './errors/session_errors_reducer'
import productsErrors from './errors/products_error_reducer'
import uiErrors from './errors/ui_errors_reducer'

export default combineReducers({
  session: sessionErrors,
  products: productsErrors,
  ui: uiErrors
});

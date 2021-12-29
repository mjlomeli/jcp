import { combineReducers } from 'redux';

import sessionErrors from './errors/session_error_reducer'
import productsErrors from './errors/product_error_reducer'
import uiErrors from './errors/ui_error_reducer'

export default combineReducers({
  session: sessionErrors,
  products: productsErrors,
  ui: uiErrors
});

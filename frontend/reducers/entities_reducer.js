import { combineReducers } from 'redux';

import users from './entities/user_reducer';
import products from './entities/product_reducer'

export default combineReducers({
  users,
  products
});

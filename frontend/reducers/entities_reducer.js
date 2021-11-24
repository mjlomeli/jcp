import { combineReducers } from 'redux';

import users from './entities/users_reducer';
import products from './entities/products_reducer'

export default combineReducers({
  users,
  products
});

import {combineReducers} from 'redux';
import QueryReducer from "./index/product_query_reducer";
export default combineReducers({
    query: QueryReducer
});

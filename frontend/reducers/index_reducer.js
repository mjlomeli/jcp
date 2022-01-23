import {combineReducers} from 'redux';
import QueryReducer from "./index/product_query_reducer";
import ProductsTitlesReducer from "./index/products_titles_reducer";
export default combineReducers({
    query: QueryReducer,
    titles: ProductsTitlesReducer
});

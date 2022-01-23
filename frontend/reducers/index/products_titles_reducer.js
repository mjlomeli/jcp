import {RECEIVE_PRODUCTS_TITLES} from "../../actions/product_action";
import {Trie} from "../../utils/tools";

let initalState = {data: {},  tri: new Trie()};

export default function ProductsTitlesReducer(prevState=initalState, action){
    Object.freeze(prevState);
    switch(action.type){
        case RECEIVE_PRODUCTS_TITLES:
            let titles = Object.keys(action.titles);
            return {data: action.titles,  tri: Trie.setup(titles)};
        default:
            return prevState
    }
}
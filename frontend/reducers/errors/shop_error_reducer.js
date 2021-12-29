import {
    RECEIVE_SHOP,
    RECEIVE_SHOP_ERROR
} from "../../actions/shop_action";

export default (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_SHOP_ERROR:
            return action.errors;
        case RECEIVE_SHOP:
            return [];
        default:
            return prevState;
    }
};

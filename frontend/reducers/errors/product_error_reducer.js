import {
    RECEIVE_PRODUCT,
    RECEIVE_PRODUCT_ERROR
} from "../../actions/product_action";

export default (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_PRODUCT_ERROR:
            return action.errors;
        case RECEIVE_PRODUCT:
            return []; // if product is valid, then errors are empty
        default:
            return prevState;
    }
};

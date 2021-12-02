import {
    RECEIVE_PRODUCT,
    RECEIVE_PRODUCT_ERROR
} from "../../actions/product_actions";

export default (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_PRODUCT_ERROR:
            return action.errors;
        case RECEIVE_PRODUCT:
            return []; // If the product_template is valid, return empty errors
        default:
            return prevState;
    }
};

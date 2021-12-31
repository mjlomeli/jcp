import React from 'react';

import HeaderTemplate from "./../themes/header_template/header_template";
import CartTemplate from "./../themes/cart_template/cart_template";
import FooterTemplate from "../themes/footer_template/footer_template";

const CartPage = () => (
    <div>
        <HeaderTemplate />
        <CartTemplate />
        <FooterTemplate />
    </div>
);

export default CartPage;
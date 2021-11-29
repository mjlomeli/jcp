import React from 'react';

import HeaderTemplate from "./../themes/header_template/header_template";
import FooterTemplate from "./../themes/footer/footer_template";
import ProductsTemplate from "../themes/products_list/products_list";

const ProductList = () => (
    <div>
        <HeaderTemplate />
        <ProductsTemplate />
        <FooterTemplate />
    </div>
);

export default ProductList;
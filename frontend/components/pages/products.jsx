import React from 'react';

import HeaderTemplate from "./../themes/header_template/header_template";
import ProductsTemplate from "../themes/products_template/products_template";
import FooterTemplate from "../themes/footer/footer_template";

const Products = () => (
    <div>
        <HeaderTemplate />
        <ProductsTemplate />
        <FooterTemplate />
    </div>
);

export default Products;
import React from 'react';

import HeaderTemplate from "./../themes/header_template/header_template";
import ProductTemplate from "../themes/product_template/product_template";
import FooterTemplate from "../themes/footer/footer_template";


const Product = (productId) => (
    <div>
        <HeaderTemplate />
        <ProductTemplate productId={productId}/>
        <FooterTemplate />
    </div>
);

export default Product;
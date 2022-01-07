import React from 'react';

import HeaderTemplate from "../themes/header_template/profile_tool";
import ProductsTemplate from "../themes/products_template/products_template";
import FooterTemplate from "../themes/footer_template/footer_template";


const ProductsPage = (products) => (
    <div>
        <HeaderTemplate />
        <ProductsTemplate products={products}/>
        <FooterTemplate />
    </div>
);

export default ProductsPage;
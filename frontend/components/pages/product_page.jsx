import React from 'react';

import HeaderTemplate from "../themes/header_template/profile_tool";
import ProductTemplate from "../themes/product_template/product_template";
import FooterTemplate from "../themes/footer_template/footer_template";


const ProductPage = (productId) => (
    <div>
        <HeaderTemplate />
        <ProductTemplate productId={productId}/>
        <FooterTemplate />
    </div>
);

export default ProductPage;
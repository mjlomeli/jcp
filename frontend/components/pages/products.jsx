import React from 'react';

import HeaderTemplate from "./../themes/header_template/header_template";
import FooterTemplate from "./../themes/footer/footer_template";
import ProductsTemplate from "../themes/products/products";

const Home = () => (
    <div>
        <HeaderTemplate />
        <ProductsTemplate />
        <FooterTemplate />
    </div>
);

export default Home;
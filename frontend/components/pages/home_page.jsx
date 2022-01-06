import React from 'react';

import HeaderTemplate from "./../themes/header_template/header_template";
import FooterTemplate from "./../themes/footer_template/footer_template";
import BodyTemplate from "../themes/home_body_template/home_body_template";

const HomePage = () => (
    <div style={{width: "100%"}}>
        <HeaderTemplate />
        <BodyTemplate />
        <FooterTemplate />
    </div>
);

export default HomePage;
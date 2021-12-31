import React from 'react';

import HeaderTemplate from "./../themes/header_template/header_template";
import FooterTemplate from "./../themes/footer_template/footer_template";
import BodyTemplate from "./../themes/body_template/body_template";

const HomePage = () => (
    <div>
        <HeaderTemplate />
        <BodyTemplate />
        <FooterTemplate />
    </div>
);

export default HomePage;
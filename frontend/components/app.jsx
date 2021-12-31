import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import GreetingContainer from './greeting/greeting_container';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
// import SignUpFormContainer from './session_form/signup_form_container';
// import LogInFormContainer from './session_form/login_form_container';
// import DemoLogInFormContainer from './session_form/demo_form_container';


// import HomePage from "./pages/home_page";
// import ProductsPage from "./pages/products_page";
// import ProductPage from "./pages/product_page";
// import CartPage from "./pages/cart_page";


// import HeaderTemplate from "./themes/header_template/header_template";
// import FooterTemplate from "./themes/footer_template/footer_template";
import HomeBodyTemplate from "./themes/home_body_template/home_body_template";
// import ProductsTemplate from "./themes/products_template/products_template";
// import ProductTemplate from "./themes/product_template/product_template";
// import CartTemplate from "./themes/cart_template/cart_template";

// import {DropdownLayout} from "./user_controls/navbar/dropdown";
// import NavbarLayout from "./user_controls/navbar/navbar";
// import Gallery from "./user_controls/gallery/gallery";
// import Products_page from "./pages/products";
// import Cart_page from "./pages/cart";
// import CartItem from "./user_controls/cart_item/cart_item";
// import CardFeatured from "./user_controls/card_featured/card_featured";
// import CardListing from "./user_controls/card_listing/card_listing";
// import CardThumbnail from "./user_controls/card_thumbnail/card_thumbnail";
// import CircularThumbnail from "./user_controls/circular_thumbnail/circular_thumbnail";
// import Rating from "./user_controls/rating/rating";
// import SearchBar from "./user_controls/searchbar/searchbar";
// import ProductsList from "./user_controls/product_list/products_list";
// import FlowLayout from "./user_controls/flow_layout/flow_layout";
// import GridLayout from "./user_controls/grid_layout/grid_layout";

/* learn more about grid-auto-flow */

const App = () => (
    <div>
        {/*DON'T REMOVE*/}
        <header>
            <Link to="/home" className="header-link">
                <h1>JCP</h1>
            </Link>
            <GreetingContainer />
        </header>
        <Switch>
            {/*<AuthRoute exact path="/login" component={LogInFormContainer} />*/}
            {/*<AuthRoute exact path="/signup" component={SignUpFormContainer} />*/}
            {/*<AuthRoute exact path="/demo" component={DemoLogInFormContainer} />*/}

            {/*<Route exact path="/home_page" component={HomePage} />*/}
            {/*<Route exact path="/products" component={ProductsPage} />*/}
            {/*<ProtectedRoute exact path="/cart" component={CartPage} />*/}

            {/*<Route exact path="/header_template" component={HeaderTemplate} />*/}
            {/*<Route exact path="/footer" component={FooterTemplate} />*/}
            <Route exact path="/home_body_template" component={HomeBodyTemplate}/>
            {/*<Route exact path="/product/:id" component={ProductTemplate} />*/}
            {/*<Route exact path="/products_template" component={ProductsTemplate} />*/}
            {/*<ProtectedRoute exact path="/cart_template" component={CartTemplate} />*/}

            {/*<Route exact path="/gallery" component={Gallery} />*/}
            {/*<Route exact path="/card_featured" component={CardFeatured} />*/}
            {/*<Route exact path="/card_listing" component={CardListing} />*/}
            {/*<Route exact path="/card_thumbnail" component={CardThumbnail} />*/}
            {/*<Route exact path="/circular_thumbnail" component={CircularThumbnail} />*/}
            {/*<Route exact path="/products_list" component={ProductsList} />*/}
            {/*<Route exact path="/card_listing/:id" component={CardListing} />*/}
            {/*<Route exact path="/cart_item" component={CartItem} />*/}
            {/*<Route exact path="/gallery/:id" component={Gallery} />*/}
            {/*<Route exact path="/rating" component={Rating} />*/}
            {/*<Route exact path="/searchbar" component={SearchBar} />*/}
            {/*<Route exact path="/rating" component={Rating} />*/}
            {/*<ProtectedRoute exact path="/user/:id" component={ProfileContainer} />*/}

            {/*<Route exact path="/flow_layout" component={FlowLayout} />*/}
            {/*<Route exact path="/grid_layout/:id" component={GridLayout} />*/}
            {/*<Route exact path="/grid_layout" component={GridLayout} />*/}
            {/*<Route exact path="/dropdown" component={DropdownLayout} />*/}
            {/*<Route exact path="/nav_bar" component={NavbarLayout} />*/}
        </Switch>
        {/*END OF DON'T REMOVE*/}

    </div>
);

export default App;
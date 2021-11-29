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
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import DemoLogInFormContainer from './session_form/demo_form_container';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import Gallery from "./user_controls/gallery/gallery";
import CartItem from "./user_controls/cart_item/cart_item";
import ProductList from "./pages/product_list";
import Home from "./pages/home";
import FooterTemplate from "./themes/footer/footer_template";
import CardFeatured from "./user_controls/card_featured/card_featured";
import CardListing from "./user_controls/card_listing/card_listing";
import CardThumbnail from "./user_controls/card_thumbnail/card_thumbnail";
import CircularThumbnail from "./user_controls/circular_thumbnail/circular_thumbnail";
import NavbarLayout from "./user_controls/navbar/navbar";
import Rating from "./user_controls/rating/rating";
import SearchBar from "./user_controls/searchbar/searchbar";

/* learn more about grid-auto-flow */

const App = () => (
    <div>
        {/*DON'T REMOVE*/}
        <header>
            <Link to="/" className="header-link">
                <h1>JCP</h1>
            </Link>
            <GreetingContainer />
        </header>
        <Switch>
            <AuthRoute exact path="/login" component={LogInFormContainer} />
            <AuthRoute exact path="/signup" component={SignUpFormContainer} />
            <AuthRoute exact path="/demo" component={DemoLogInFormContainer} />
            {/*<ProtectedRoute exact path="/user/:id" component={ProfileContainer} />*/}
            <Route exact path="/gallery" component={Gallery} />
            <ProtectedRoute exact path="/cart" component={CartItem} />
            <Route exact path="/product_list" component={ProductList} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/card_featured" component={CardFeatured} />
            <Route exact path="/card_listing" component={CardListing} />
            <Route exact path="/card_thumbnail" component={CardThumbnail} />
            <Route exact path="/cart_item" component={CartItem} />
            <Route exact path="/circular_thumbnail" component={CircularThumbnail} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/rating" component={Rating} />
            <Route exact path="/searchbar" component={SearchBar} />
            <Route exact path="/nav_bar" component={NavbarLayout} />

        </Switch>
        {/*END OF DON'T REMOVE*/}

    </div>
);

export default App;
import React from 'react';
import {connect, Provider} from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import GreetingContainer from './greeting/greeting_container';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import DemoLogInFormContainer from './session_form/demo_form_container';
import Alert from './../components/user_controls/alert/alert'
import Modal from "./user_controls/modal/modal";


import HomePage from "./pages/home_page";
// import ProductsPage from "./pages/products_page";
// import ProductPage from "./pages/product_page";
// import CartPage from "./pages/cart_page";


import HeaderTemplate from "./themes/header_template/header_template";
// import FooterTemplate from "./themes/footer_template/footer_template";
// import HomeBodyTemplate from "./themes/home_body_template/home_body_template";
// import ProductsTemplate from "./themes/products_template/products_template";
// import ProductTemplate from "./themes/product_template/product_template";
// import CartTemplate from "./themes/cart_template/cart_template";

// import Rating from "./user_controls/rating/rating";
import CartItem from "./user_controls/cart_item/cart_item";
import PaymentSelection from "./user_controls/payment_selection/payment_selection";
import CardFeatured from "./user_controls/card_featured/card_featured";
// import CardListing from "./user_controls/card_listing/card_listing";
// import CardThumbnail from "./user_controls/card_thumbnail/card_thumbnail";
// import CircularThumbnail from "./user_controls/circular_thumbnail/circular_thumbnail";
// import ProductsList from "./user_controls/product_list/products_list";
// import Gallery from "./user_controls/gallery/gallery";
// import SearchBar from "./user_controls/searchbar/searchbar";
import RegisterModal from "./user_controls/modal/register_modal"
import LoginModal from "./user_controls/modal/login_modal"

// import FlowLayout from "./user_controls/flow_layout/flow_layout";
// import GridLayout from "./user_controls/grid_layout/grid_layout";
// import {DropdownLayout} from "./user_controls/navbar/dropdown";
// import NavbarLayout from "./user_controls/navbar/navbar";

/* learn more about grid-auto-flow */

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div style={{width: "100%"}}>
            <Modal />
            {/*DON'T REMOVE*/}
            <header>
                <Link to="/home" className="header-link">
                    <h1>JCP</h1>
                </Link>
                <GreetingContainer/>
            </header>
            <Switch>
                <AuthRoute exact path="/login" component={LogInFormContainer}/>
                <AuthRoute exact path="/signup" component={SignUpFormContainer}/>
                <AuthRoute exact path="/demo" component={DemoLogInFormContainer}/>

                <Route exact path="/home_page" component={HomePage} />
                {/*<Route exact path="/products_page" component={ProductsPage} />*/}
                {/*<Route exact path="/product_page" component={ProductPage} />*/}
                {/*<ProtectedRoute exact path="/cart" component={CartPage} />*/}

                <Route exact path="/header_template" component={HeaderTemplate} />
                {/*<Route exact path="/home_body_template" component={HomeBodyTemplate}/>*/}
                {/*<Route exact path="/footer" component={FooterTemplate} />*/}
                {/*<Route exact path="/product/:id" component={ProductTemplate} />*/}
                {/*<Route exact path="/products_template" component={ProductsTemplate} />*/}
                {/*<ProtectedRoute exact path="/cart_template" component={CartTemplate} />*/}

                {/*<Route exact path="/products_list" component={ProductsList} />*/}
                <Route exact path="/payment_selection" component={PaymentSelection} />
                <Route exact path="/payment_selection/:id" component={PaymentSelection} />
                <Route exact path="/cart_item" component={CartItem}/>
                <Route exact path="/cart_item/:id" component={CartItem}/>
                <Route exact path="/register_modal" component={RegisterModal}/>
                <Route exact path="/login_modal" component={LoginModal}/>
                {/*<Route exact path="/gallery" component={Gallery} />*/}
                {/*<Route exact path="/gallery/:id" component={Gallery} />*/}
                {/*<Route exact path="/rating" component={Rating} />*/}
                {/*<Route exact path="/searchbar" component={SearchBar} />*/}
                {/*<Route exact path="/rating" component={Rating} />*/}
                {/*<ProtectedRoute exact path="/user/:id" component={ProfileContainer} />*/}
                {/*<Route exact path="/circular_thumbnail" component={CircularThumbnail} />*/}
                {/*<Route exact path="/circular_thumbnail/:id" component={CircularThumbnail} />*/}
                {/*<Route exact path="/card_thumbnail" component={CardThumbnail} />*/}
                {/*<Route exact path="/card_thumbnail/:id" component={CardThumbnail} />*/}
                {/*<Route exact path="/card_listing/:id" component={CardListing} />*/}
                <Route exact path="/card_featured" component={CardFeatured} />
                <Route exact path="/card_featured/:id" component={CardFeatured} />
                {/*<Route exact path="/card_listing" component={CardListing} />*/}

                {/*<Route exact path="/flow_layout" component={FlowLayout} />*/}
                {/*<Route exact path="/grid_layout/:id" component={GridLayout} />*/}
                {/*<Route exact path="/grid_layout" component={GridLayout} />*/}
                {/*<Route exact path="/dropdown" component={DropdownLayout} />*/}
                {/*<Route exact path="/nav_bar" component={NavbarLayout} />*/}
            </Switch>
            {/*END OF DON'T REMOVE*/}
            <Alert />
        </div>
    }
}

export default App;
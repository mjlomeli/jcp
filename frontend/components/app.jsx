import React from 'react';
import {connect, Provider} from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import Alert from './../components/user_controls/alert/alert'
import Modal from "./user_controls/modal/modal"


import HomePage from "./pages/home_page";
import ProductsPage from "./pages/products_page";
import ProductPage from "./pages/product_page";
// import CartPage from "./pages/cart_page";


import HeaderTemplate from "./themes/header_template/header_template";
import FooterTemplate from "./themes/footer_template/footer_template";
import ProductTemplate from "./themes/product_template/product_template";
// import CartTemplate from "./themes/cart_template/cart_template";

// import Rating from "./user_controls/rating/rating";
// import CartItem from "./user_controls/cart_item/cart_item";
// import PaymentSelection from "./user_controls/payment_selection/payment_selection";
// import CardFeatured from "./user_controls/card_featured/card_featured";
// import CardListing from "./user_controls/card_listing/card_listing";
// import CardThumbnail from "./user_controls/card_thumbnail/card_thumbnail";
// import CircularThumbnail from "./user_controls/circular_thumbnail/circular_thumbnail";
// import ProductsList from "./user_controls/product_list/products_list";
// import Gallery from "./user_controls/gallery/gallery";


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
                <HeaderTemplate />
            </header>
            {/*<CardListing />*/}
            {/*<CardListing productId={1147271903} />*/}
            {/*<CardListing productId={1133338986} />*/}
            <Switch>
                {/*<AuthRoute exact path="/login" component={LogInFormContainer}/>*/}
                {/*<AuthRoute exact path="/signup" component={SignUpFormContainer}/>*/}
                {/*<AuthRoute exact path="/demo" component={DemoLogInFormContainer}/>*/}

                <Route exact path="/home" component={HomePage} />
                <Route exact path="/products" component={ProductsPage} />
                <Route exact path="/product" component={ProductPage} />
                {/*<ProtectedRoute exact path="/cart" component={CartPage} />*/}

                {/*<Route exact path="/footer" component={FooterTemplate} />*/}
                <Route exact path="/product/:id" component={ProductTemplate} />
                {/*<ProtectedRoute exact path="/cart_template" component={CartTemplate} />*/}

                {/*<Route exact path="/products_list" component={ProductsList} />*/}
                {/*<Route exact path="/payment_selection" component={PaymentSelection} />*/}
                {/*<Route exact path="/payment_selection/:id" component={PaymentSelection} />*/}
                {/*<Route exact path="/cart_item" component={CartItem}/>*/}
                {/*<Route exact path="/cart_item/:id" component={CartItem}/>*/}

                {/*<Route exact path="/gallery" component={Gallery} />*/}
                {/*<Route exact path="/gallery/:id" component={Gallery} />*/}
                {/*<Route exact path="/searchbar" component={SearchBar} />*/}
                {/*<Route exact path="/circular_thumbnail" component={CircularThumbnail} />*/}
                {/*<Route exact path="/circular_thumbnail/:id" component={CircularThumbnail} />*/}
                {/*<Route exact path="/card_thumbnail" component={CardThumbnail} />*/}
                {/*<Route exact path="/card_thumbnail/:id" component={CardThumbnail} />*/}
                {/*<Route exact path="/card_listing/:id" component={CardListing} />*/}
                {/*<Route exact path="/card_listing" component={CardListing} />*/}
                {/*<Route exact path="/card_featured" component={CardFeatured} />*/}
                {/*<Route exact path="/card_featured/:id" component={CardFeatured} />*/}
            </Switch>

            <FooterTemplate />
            {/*END OF DON'T REMOVE*/}
            <Alert />
        </div>
    }
}

export default App;
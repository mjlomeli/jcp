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
// import ProductsPage from "./pages/products_page";
// import ProductPage from "./pages/product_page";
import FavoritesPage from "./pages/favorites_page";
// import CartPage from "./pages/cart_page";


import HeaderTemplate from "./themes/header_template/header_template";
import FooterTemplate from "./themes/footer_template/footer_template";

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
            <Switch>
                {/*<AuthRoute exact path="/login" component={LogInFormContainer}/>*/}
                {/*<AuthRoute exact path="/signup" component={SignUpFormContainer}/>*/}
                {/*<AuthRoute exact path="/demo" component={DemoLogInFormContainer}/>*/}

                <Route exact path="/" component={HomePage} />
                <Route exact path="/home" component={HomePage} />
                {/*<Route exact path="/products" component={ProductsPage} />*/}
                <ProtectedRoute exact path="/favorites" component={FavoritesPage} />
                {/*<Route exact path="/product/:id" component={ProductPage} />*/}
                {/*<ProtectedRoute exact path="/cart" component={CartPage} />*/}

            </Switch>

            <FooterTemplate />
            {/*END OF DON'T REMOVE*/}
            <Alert />
        </div>
    }
}

export default App;
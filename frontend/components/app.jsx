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
        </Switch>
        {/*END OF DON'T REMOVE*/}
    </div>
);

export default App;
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


import HeaderTemplate from "./themes/header_template/header_template";
import FooterTemplate from "./themes/footer/footer_template";
import BodyTemplate from "./themes/body_template/body_template";
import StarRating from "./user_controls/star_rating/star_rating";


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
        </Switch>
        <br />
        <br />
        <StarRating />
        <br />
        <br />
        <br />
        {/*END OF DON'T REMOVE*/}

        <HeaderTemplate />
        <BodyTemplate />
        <FooterTemplate />
    </div>
);

export default App;
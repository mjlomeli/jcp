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
import CardListing from "./user_controls/card_listing/card_listing";
import GridLayout from "./user_controls/grid_layout/grid_layout";


let card = <CardListing />
let layout4x1 = ['one two three four']
let comp4x1 = {'one': card, 'two': card, 'three': card, 'four': card}
let layout2x3 = ['one two three', 'four five six']
let comp2x3 = {'one': card, 'two': card, 'three': card, 'four': card, 'five': card, 'six': card}
let layout1x2 = ['one two two']
let comp1x2 = {'one': card, 'two': card}
let layout2x4 = ['one two three four', 'five six seven eight']
let comp2x4 = {'one': card, 'two': card, 'three': card, 'four': card, 'five': card, 'six': card, 'seven': card, 'eight': card}



const App = () => (
    <div>
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
        <GridLayout areas={layout2x4} components={comp2x4} containerClass="grid" itemClass="item"/>
    </div>
);

export default App;
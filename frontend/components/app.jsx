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

import GridLayout from "./user_controls/grid_layout/grid_layout";
import HomeModule from "./themes/home_modules/home_module";
import CircularThumbnail from "./user_controls/circular_thumbnail/circular_thumbnail";


let card = <CircularThumbnail />

let layout4x1 = ['one two three four']
let comp4x1 = {'one': card, 'two': card, 'three': card, 'four': card}
let layout2x3 = ['one two three', 'four five six']
let comp2x3 = {'one': card, 'two': card, 'three': card, 'four': card, 'five': card, 'six': card}
let layout1x2 = ['one two two']
let comp1x2 = {'one': card, 'two': card}
let layout2x4 = ['one two three four', 'five six seven eight']
let comp2x4 = {'one': card, 'two': card, 'three': card, 'four': card, 'five': card, 'six': card, 'seven': card, 'eight': card}

let layout = <GridLayout areas={layout4x1} components={comp4x1} />
let home = <HomeModule seasonal={layout}/>

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
        {home}
    </div>
);

export default App;
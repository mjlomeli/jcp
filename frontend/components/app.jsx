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
import CardListing from "./user_controls/card_listing/card_listing";
import CardThumbnail from "./user_controls/card_thumbnail/card_thumbnail";


let card = <CircularThumbnail />
let listing = <CardListing />
let thumb = <CardThumbnail />

let layout4x1 = ['one two three four']
let comp4x1 = {'one': card, 'two': card, 'three': card, 'four': card}
let layout2x3 = ['one two three', 'four five six']
let comp2x3 = {'one': thumb, 'two': thumb, 'three': thumb, 'four': thumb, 'five': thumb, 'six': thumb}
let layout1x2 = ['one two two']
let comp1x2 = {'one': card, 'two': card}
let layout2x4 = ['one two three four', 'five six seven eight']
let comp2x4 = {'one': listing, 'two': listing, 'three': listing, 'four': listing, 'five': listing, 'six': listing, 'seven': listing, 'eight': listing}

let layout = <GridLayout areas={layout4x1} components={comp4x1} />
let home = <HomeModule seasonal={layout}/>
let featured = <GridLayout areas={layout2x4} components={comp2x4} />
let viewed = <GridLayout areas={layout2x3} components={comp2x3} />

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
        <div>
            {home}
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div>
            {viewed}
        </div>
        <br /><br /><br /><br /><br /><br /><br />
        <div>
            {featured}
        </div>
    </div>
);

export default App;
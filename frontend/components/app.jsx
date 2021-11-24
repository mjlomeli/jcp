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

let gridTemplateAreas = [
    ['header header header header header header'],
    ['menu main main main right right'],
    ['menu footer footer footer footer footer']]
let components = {
    'header': <div>Header</div>,
    'menu': <div>Menu</div>,
    'main': <div>Main</div>,
    'right': <div>Right</div>,
    'footer': <div>Footer</div>
}

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
        <GridLayout gridTemplateAreas={gridTemplateAreas} components={components}/>
    </div>
);

export default App;
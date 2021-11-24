import React from 'react';
import {Link} from 'react-router-dom';


const Greeting = ({currentUser, logout}) => {
    // when the page is refreshed
    const sessionLinks = () => <>
        <nav className="login-signup">
            <Link to="/login">Login</Link>
            &nbsp;or&nbsp;
            <Link to="/signup">Sign up!</Link>
            &nbsp;or&nbsp;
            <Link to="/demo">Demo</Link>
        </nav>
    </>
    
    const personalGreeting = () => {
        return <>
            <hgroup className="header-group">
                <h2 className="header-name">Welcome {currentUser.first_name}!</h2>
                <button className="header-button" onClick={logout}>Log Out</button>
            </hgroup>
        </>
    }
    return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;

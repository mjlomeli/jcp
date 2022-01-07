import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import './tool.css'
import GridLayout from "../../user_controls/grid_layout/grid_layout";
import {createLogin} from "../../../actions/ui_modal_action";

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
    createLogin: () => dispatch(createLogin())
});

class LoggedOutTool extends React.Component {
    constructor(props) {
        super(props);
    }

    cart() {
        return <>
            <Link to="#" className="tool-button" style={{textDecoration: "inherit", color: "inherit"}}>
                <svg className="tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="9" cy="20" r="2"/>
                    <circle cx="16" cy="20" r="2"/>
                    <path
                        d="M21,5H5.665L4.978,1.79A1,1,0,0,0,4,1H1A1,1,0,0,0,1,3H3.191L6.022,16.21a0.962,0.962,0,0,0,.064.159,1.015,1.015,0,0,0,.063.155,0.978,0.978,0,0,0,.133.153,1.006,1.006,0,0,0,.088.1,1,1,0,0,0,.185.105,0.975,0.975,0,0,0,.107.06A0.994,0.994,0,0,0,7,17H18a1,1,0,0,0,.958-0.713l3-10A1,1,0,0,0,21,5Zm-2.244,5H16V7h3.656ZM7.819,15l-0.6-3H9v3H7.819ZM11,12h3v3H11V12Zm0-2V7h3v3H11ZM9,7v3H6.82L6.22,7H9Zm8.256,8H16V12h2.156Z"/>
                </svg>
                <span className="tooltip" role="tooltip">Cart</span>
            </Link>
        </>
    }

    signIn() {
        return <div onClick={() => this.props.createLogin()}>
            <label className="tool-button">Sign in</label>
            <span className="tooltip" role="tooltip">{"Sign in"}</span>
        </div>
    }

    render() {
        let areas = ['signin cart'];
        let components = {
            'signin': this.signIn(),
            'cart': this.cart()
        }
        return <GridLayout areas={areas} components={components} className="tool-buttons"
                           classElements="tool-button-elements" />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedOutTool);
import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import "./login_modal.css"
import GridLayout from "../grid_layout/grid_layout";
import {createLogin, createRegister, deleteModal} from "../../../actions/ui_modal_action";
import {connect} from "react-redux";


const mapStateToProps = (state, ownProps) => {
    return {
        user: state.session,
        type: state.ui.modal.type
    }
};

const mapDispatchToProps = dispatch => ({
    createLogin: () => dispatch(createLogin()),
    createRegister: () => dispatch(createRegister()),
    deleteModal: () => dispatch(deleteModal())
});

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", staySignedIn: true}
        this.onclickbackground = this.onClickBackground.bind(this);
        this.onclickregister = this.onClickRegister.bind(this);
        this.oncheckboxchange = this.onCheckBoxChange.bind(this);
    }

    onClickBackground(e) {
        this.setState({type: null})
        this.current.current.remove();
    }

    onCheckBoxChange(e){ this.setState({staySignedIn: e.currentTarget.checked}); }

    onSubmit() {
        this.props.deleteModal();
    }

    onClickRegister(e) {
        this.props.createRegister();
    }

    header() {
        let areas = ['text space space button']
        let components = {
            "text": <div className="login-signin-text">Sign in</div>,
            "space": <div className="login-header-space" />,
            "button": <button className="login-register-button" type="button" onClick={this.onclickregister}>
                Register
            </button>
        }

        return <GridLayout areas={areas} components={components} className="login-header"/>
    }

    form() {
        let areas = ['email', 'password']
        let components = {
            'email': <>
                <span className="login-email-text">Email address</span>
                <input className="login-input-email" type="text"/>
            </>,
            'password': <>
                <span className="login-password-text">Password</span>
                <input className="login-input-password" type="password"/>
            </>
        }

        return <GridLayout areas={areas} components={components} className="login-form"/>
    }

    options() {
        let areas = ['checkbox label center forgot forgot'];
        let components = {
            "checkbox": <label className="login-container">
                <input type="checkbox" onChange={this.oncheckboxchange} checked={this.state.staySignedIn}/>
                <span className="login-checkmark" />
            </label>,
            "label": <label className="login-stay-signed">Stay signed in</label>,
            "center": <div className="login-options-divider"/>,
            "forgot": <Link to="#" className="login-forgot-pass">Forgot your password?</Link>
        }

        return <GridLayout areas={areas} components={components} className="login-options"/>
    }

    divider() {
        let areas = ['left left left middle right right right'];
        let components = {
            "left": <div className="login-left-divider"/>,
            "middle": <div className="login-divider-text">OR</div>,
            "right": <div className="login-right-divider"/>
        }

        return <GridLayout areas={areas} components={components} className="login-divider" />
    }

    alternativeSignIn() {
        let areas = ['google', 'facebook', 'apple'];
        let components = {
            'google': <button className="login-google" type="button">Continue with Google</button>,
            'facebook': <button className="login-facebook" type="button">Continue with Facebook</button>,
            'apple': <button className="login-apple" type="button">Continue with Apple</button>
        }
        return <GridLayout areas={areas} components={components} className="login-alternatives"/>
    }

    render() {
        let areas = ['header', 'form', 'options', 'submit', 'divider',
            'alternate', 'alternate', 'alternate', 'text', 'text'
        ]

        let components = {
            'header': this.header(),
            'form': this.form(),
            "options": this.options(),
            "submit": <button className="login-submit-button" type="button">Sign in</button>,
            'divider': this.divider(),
            'alternate': this.alternativeSignIn(),
            "text": <p className="login-terms-conditions">
                By clicking Sign in or Continue with Google, Facebook, or Apple, you agree to JCP's
                Terms of Use and Privacy Policy. JCP may send you communications; you may change your
                preferences in your account settings. We'll never post without your permission.</p>
        }

        return <div>
            <div className="login-background" onClick={this.onclickbackground}/>
            <GridLayout areas={areas} components={components} className="login-modal"
                        classElements="login-modal-items"/>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import "./modal.css"
import GridLayout from "../grid_layout/grid_layout";
import {createLogin, createRegister, deleteModal} from "../../../actions/ui_modal_action";
import {connect} from "react-redux";


const mapStateToProps = (state, ownProps) =>{
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

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", staySignedIn: true}
        this.onclickbackground = this.onClickBackground.bind(this);
        this.login = React.createRef();
        this.register = React.createRef();
        this.current = null;
    }

    onClickBackground(e){
        this.current.current.remove();
    }

    onSubmit(){
        if (this.props.type === "register"){

        } else if (this.props.type === "login"){

        }
        this.props.deleteModal();
    }

    loginComponent(){
        let areas = ['signin-text register-button', 'email-form email-form', 'password-form password-form',
            'stay-signed-in forgot-password', 'submit-button submit-button', 'divider divider',
            'alternate-sign-in alternate-sign-in', 'alternate-sign-in alternate-sign-in',
            'alternate-sign-in alternate-sign-in', 'text text', 'text text'
        ]

        let components = {
            "signin-text": <h3 className="login-signin-text">Sign in</h3>,
            "register-button": <button className="register-button" type="button" onClick={() => this.props.createRegister()}>Register</button>,
            "email-form": <><span className="login-email-text">Email address</span><input className="login-input-email" type="text" /></>,
            "password-form": <><span className="login-password-text">Password</span><input className="login-input-password" type="password" /></>,
            "stay-signed-in": <><input className="login-checkbox" type="checkbox" checked={this.state.staySignedIn}/><label className="login-stay-signed">Stay signed in</label></>,
            "forgot-password": <Link to="#" className="login-forgot-pass">Forgot your password?</Link>,
            "submit-button": <button className="login-submit-button" type="button">Sign in</button>,
            "divider": <div className="login-divider"><span className="login-left-divider" /><div className="login-divider-text">OR</div><span className="login-right-divider" /></div>,
            "alternate-sign-in": <div className="login-alternatives">
                <button className="login-google" type="button">Continue with Google</button>
                <button className="login-facebook" type="button">Continue with Facebook</button>
                <button className="login-apple" type="button">Continue with Apple</button>
            </div>,
            "text": <p className="login-terms-conditions">
                By clicking Sign in or Continue with Google, Facebook, or Apple, you agree to Etsy's
                Terms of Use and Privacy Policy. Etsy may send you communications; you may change your
                preferences in your account settings. We'll never post without your permission.</p>
        }

        return <div ref={this.login}><div className="login-background" onClick={this.onclickbackground} />
            <GridLayout areas={areas} components={components} className="login-modal" classElements="login-modal-items"/>
        </div>
    }

    registerComponent(){
        let areas = ['reg reg', 'email email', 'name name',
            'password password', 'submit submit',
            'divider divider', 'alternate alternate', 'alternate alternate',
            'alternate alternate', 'text text', 'text text'
        ]

        let components = {
            "reg": <>
                <h3 className="register-title">Create your account</h3>
                <label className="register-text">Registration is easy.</label>
            </>,
            "email": <><span className="register-email-text">Email address</span><input className="register-input-email" type="text" /></>,
            "name": <><span className="register-first-name-text">First name</span><input className="register-input-first-name" type="text" /></>,
            "password": <><span className="register-password-text">Password</span><input className="register-input-password" type="password" /></>,
            "submit": <button className="register-submit-button" type="button">Register</button>,
            "divider": <div className="login-divider"><span className="login-left-divider" /><span className="login-divider-text">OR</span><span className="login-right-divider" /></div>,
            "alternate": <div className="register-alternatives">
                <button className="register-google" type="button">Continue with Google</button>
                <button className="register-facebook" type="button">Continue with Facebook</button>
                <button className="register-apple" type="button">Continue with Apple</button>
            </div>,
            "text": <p className="register-terms-conditions">
                By clicking Sign in or Continue with Google, Facebook, or Apple, you agree to Etsy's
                Terms of Use and Privacy Policy. Etsy may send you communications; you may change your
                preferences in your account settings. We'll never post without your permission.</p>
        }

        return <div ref={this.register}><div className="register-background" onClick={this.onclickbackground} />
            <GridLayout areas={areas} components={components} className="register-modal" classElements="register-modal-items"/>
        </div>
    }


    render() {
        if (this.props.type === "login") {
            this.current = this.login;
            return this.loginComponent();
        }
        else if (this.props.type === "register") {
            this.current = this.register;
            return this.registerComponent();
        }
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
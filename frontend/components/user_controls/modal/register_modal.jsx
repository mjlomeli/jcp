import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import "./register_modal.css"
import GridLayout from "../grid_layout/grid_layout";
import {deleteModal} from "../../../actions/ui_modal_action";
import {createUser, createSession} from "../../../actions/session_action";
import {connect} from "react-redux";
import {notification} from "../../../actions/alert_action";


const mapStateToProps = (state, ownProps) =>{
    return {
    }
};

const mapDispatchToProps = dispatch => ({
    notification: (message) => dispatch(notification(message)),
    deleteModal: () => dispatch(deleteModal()),
    createUser: (user) => dispatch(createUser(user)),
    createSession: (user) => dispatch(createSession(user))
});

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", firstName: "", password: "", disabled: true}
        this.onclickbackground = this.onClickBackground.bind(this);
        this.onclicksubmit = this.onClickSubmit.bind(this);
        this.onchangeinput = this.onChangeInput.bind(this);
        this.onkeyupinput = this.onKeyUpInput.bind(this);
    }

    onClickBackground(e) {
        this.props.deleteModal();
    }

    onClickSubmit(type) {
        return (e) => {
            switch (type) {
                case "submit":
                    this.props.createUser(this.state);
                    break;
                case "google":
                    this.props.notification("Google login coming soon!");
                    break;
                case "apple":
                    this.props.notification("Apple login coming soon!");
                    break;
                case "facebook":
                    this.props.notification("Facebook login coming soon!");
                    break;
                case "demo":
                    this.props.createSession({email: "demo@email.com", password: "password"});
                    break;
                default:
                    break;
            }
        }
    }

    onKeyUpInput(){
        let disabled = this.state.email.length === 0 ||
            this.state.firstName.length === 0 ||
            this.state.password.length === 0;
        if (disabled !== this.state.disabled)
            this.setState({disabled: disabled})
    }

    onChangeInput(type){
        return (e) => {
            this.setState({[type]: e.currentTarget.value})
        }
    }

    header() {
        let areas = ['title demo', 'text .']
        let components = {
            "title": <div className="register-header-title">Create your account</div>,
            "text": <div className="register-header-text">Registration is easy</div>,
            "demo": <button className="register-demo-button" onClick={this.onclicksubmit("demo")} type="button">
                Demo
            </button>
        }
        return <GridLayout areas={areas} components={components} className="register-header"/>
    }

    form() {
        let areas = ['email', 'name', 'password']
        let components = {
            'email': <>
                <span className="register-email-text">Email address *</span>
                <input className="register-input-email" onChange={this.onchangeinput("email")} value={this.state.email} onKeyUp={this.onkeyupinput} type="text"/>
            </>,

            'name': <>
                <span className="register-name-text">First name *</span>
                <input className="register-input-name" onChange={this.onchangeinput("firstName")} value={this.state.firstName} onKeyUp={this.onkeyupinput} type="text"/>
            </>,
            'password': <>
                <span className="register-password-text">Password *</span>
                <input className="register-input-password" onChange={this.onchangeinput("password")} value={this.state.password} onKeyUp={this.onkeyupinput} type="password"/>
            </>
        }

        return <GridLayout areas={areas} components={components} className="register-form"/>
    }

    divider() {
        let areas = ['left left left middle right right right'];
        let components = {
            "left": <div className="register-left-divider"/>,
            "middle": <div className="register-divider-text">OR</div>,
            "right": <div className="register-right-divider"/>
        }

        return <GridLayout areas={areas} components={components} className="register-divider" />
    }

    alternativeSignIn() {
        let areas = ['google', 'facebook', 'apple'];
        let components = {
            'google': <button className="register-google" onClick={this.onclicksubmit("google")} type="button">Continue with Google</button>,
            'facebook': <button className="register-facebook" onClick={this.onclicksubmit("facebook")} type="button">Continue with Facebook</button>,
            'apple': <button className="register-apple" onClick={this.onclicksubmit("apple")} type="button">Continue with Apple</button>
        }
        return <GridLayout areas={areas} components={components} className="register-alternatives"/>
    }

    render() {
        let areas = ['header', 'form', 'options', 'submit', 'divider',
            'alternate', 'alternate', 'alternate', 'text', 'text'
        ]

        let components = {
            'header': this.header(),
            'form': this.form(),
            "submit": <button className="register-submit-button" onClick={this.onclicksubmit("submit")} disabled={this.state.disabled} type="button">Register</button>,
            'divider': this.divider(),
            'alternate': this.alternativeSignIn(),
            "text": <p className="register-terms-conditions">
                By clicking Sign in or Continue with Google, Facebook, or Apple, you agree to JCP's
                Terms of Use and Privacy Policy. JCP may send you communications; you may change your
                preferences in your account settings. We'll never post without your permission.</p>
        }

        return <div>
            <div className="register-background" onClick={this.onclickbackground}/>
            <GridLayout areas={areas} components={components} className="register-modal"
                        classElements="register-modal-items"/>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
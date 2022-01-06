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

class RegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", stay: true}
        this.onclickbackground = this.onClickBackground.bind(this);
        this.onclicksubmit = this.onClickSubmit.bind(this);
    }

    onClickBackground(e){
    }

    onClickSubmit(){
        this.props.deleteModal();
    }

    form(){

    }

    render() {
        let registerAreas = ['reg reg', 'email email', 'name name',
            'password password', 'submit submit',
            'divider divider', 'alternate alternate', 'alternate alternate',
            'alternate alternate', 'text text', 'text text'
        ]

        let registerComponents = {
            "reg": <>
                <h3 className="register-title">Create your account</h3>
                <label className="register-text">Registration is easy.</label>
            </>,
            "email": <><span className="register-email-text">Email address</span><input className="register-input-email" type="text" /></>,
            "name": <><span className="register-first-name-text">First name</span><input className="register-input-first-name" type="text" /></>,
            "password": <><span className="register-password-text">Password</span><input className="register-input-password" type="password" /></>,
            "submit": <button className="register-submit-button" type="button" onClick={this.onclicksubmit}>Register</button>,
            "divider": <div className="login-divider"><span className="login-left-divider" /><span className="login-divider-text">OR</span><span className="login-right-divider" /></div>,
            "alternate": <div className="register-alternatives">
                <button className="register-google" type="button">Continue with Google</button>
                <button className="register-facebook" type="button">Continue with Facebook</button>
                <button className="register-apple" type="button">Continue with Apple</button>
            </div>,
            "text": <p className="register-terms-conditions">
                By clicking Sign in or Continue with Google, Facebook, or Apple, you agree to JCP's
                Terms of Use and Privacy Policy. JCP may send you communications; you may change your
                preferences in your account settings. We'll never post without your permission.</p>
        }

        return <div><div className="register-background" onClick={this.onclickbackground} />
            <GridLayout areas={registerAreas} components={registerComponents} className="register-modal" classElements="register-modal-items"/>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
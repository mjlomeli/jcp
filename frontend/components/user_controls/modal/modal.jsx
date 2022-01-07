import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from "react-redux";
import LoginModal from "./login_modal";
import RegisterModal from "./register_modal";


const mapStateToProps = (state, ownProps) =>{
    return {
        isLoggedIn: !!state.session.id,
        type: state.ui.modal.type
    }
};

const mapDispatchToProps = dispatch => ({
});

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    isRenderValid() {
        return !this.props.isLoggedIn || (this.props.isLoggedIn && !this.props.type)
    }

    resolve(){ return null; }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        if (this.props.type === "login")
            return <LoginModal />
        else if (this.props.type === "register")
            return <RegisterModal />
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
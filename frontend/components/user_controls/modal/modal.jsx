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
        userId: state.session.id,
        type: state.ui.modal.type
    }
};

const mapDispatchToProps = dispatch => ({
});

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let preProductId = this.props.productId;
        let postProductId = nextProps.productId;

        let preLoggedIn = this.props.isLoggedIn;
        let postLoggedIn = nextProps.isLoggedIn;

        let preType = this.props.type;
        let postType = nextProps.type;

        if (preProductId !== postProductId)
            return true;
        else if (preLoggedIn !== postLoggedIn)
            return true;
        else if (preType !== postType)
            return true;
        return false;
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
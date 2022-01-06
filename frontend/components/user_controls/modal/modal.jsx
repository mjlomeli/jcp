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
    }


    render() {
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
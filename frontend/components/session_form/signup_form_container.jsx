import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';
import {createUser} from '../../actions/session_action';
import SessionForm from './session_form';

const mapStateToProps = ({errors}) => ({
    errors: errors.session, // sessionErrors is an array
    formType: 'signup',
    navLink: <Link to="/login">log in instead</Link>,
});

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(createUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';
import {createSession} from '../../actions/session_action';
import SessionForm from './session_form';

const mapStateToProps = ({errors}) => ({
    errors: errors.session, // sessionErrors is an array
    formType: 'login',
    navLink: <Link to="/signup">sign up instead</Link>,
});

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(createSession(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

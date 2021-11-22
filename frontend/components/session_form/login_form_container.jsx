import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { createSession } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    // errors: errors.session,
    errors: ["ERROR: Login form container.jsx"],
    formType: 'login',
    navLink: <Link to="/signup">sign up instead</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(createSession(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

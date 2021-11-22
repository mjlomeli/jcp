import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    //errors: errors.session,
    errors: ["Error: signup form container.jsx"],
    formType: 'signup',
    navLink: <Link to="/login">log in instead</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(createUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

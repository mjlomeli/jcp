import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';
import {createSession, createUser} from '../../actions/session_action';
import SessionForm from './session_form';

const mapStateToProps = ({errors}) => ({
    errors: errors.session, // sessionErrors is an array
    formType: 'login',
    navLink: <Link to="/demo">log in as a Demo User</Link>,
});

const mapDispatchToProps = dispatch => ({
    processForm: () => dispatch(createSession({
        email: 'demo@email.com',
        password: 'password',
    }))
});


class DemoForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    renderErrors() {
        return <ul>{
            this.props.errors.map(
                (error, i) => <li key={`error-${i}`}> {error} </li>
            )
        }</ul>
    }

    render() {
        return <>
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    <h1>Demo User</h1>
                    <h3>You are about to login as a Demo User. These are your limitations:</h3>
                    <ul>
                        <li>Can not purchase products.</li>
                        <li>Posting a product will only be locally available.</li>
                        <li>Changing your username and password is disabled.</li>

                    </ul>
                    {this.renderErrors()}
                    <input className="session-submit" type="submit" value={this.props.formType}/>
                </form>
            </div>
        </>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DemoForm);
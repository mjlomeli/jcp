import {connect} from 'react-redux';
import React from 'react';
import {Link} from 'react-router-dom';
import {createSession, createUser} from '../../../actions/session_actions';

const mapStateToProps = ({entities, errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "listing_card"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {}
});


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.onclick = this.onclick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        // TODO: send to product page
    }

    renderErrors() {
        console.log(this.props.errors);
        return <ul>{
            this.props.errors.map(
                // TODO: load an error or faded notification instead
                (error, i) => <li key={`error-${i}`}> {error} </li>
            )
        }</ul>
    }

    render() {
        return <>
            <div>

            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
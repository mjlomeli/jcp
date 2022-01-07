import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import LoggedInHeader from "./logged_in_tool"
import LoggedOutHeader from "./logged_out_tool"

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: !!state.session.id
});

const mapDispatchToProps = dispatch => ({
});

class ProfileTool extends React.Component {
    constructor(props) {
        super(props);
    }
    isRenderValid() {
        return this.props.isLoggedIn !== null && typeof this.props.isLoggedIn !== "undefined";
    }

    resolve(){ return null; }

    render() {
        if (!this.isRenderValid())
            return this.resolve();

        if (this.props.isLoggedIn)
            return <LoggedInHeader />
        else
            return <LoggedOutHeader />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTool);

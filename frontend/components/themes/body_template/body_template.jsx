import {connect} from 'react-redux';
import React from 'react';
import './body_template.css'

const mapStateToProps = ({errors}) => ({
    //errors: errors.session, // need to add a ui or user_control errors
    nameId: "card_listing"
});

const mapDispatchToProps = dispatch => ({
    afunction: () => {
    }
});

class BodyTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Enjoy Cyber Week deals on small business cheer!",
            layout: props.layout
        }
    }

    render() {
        return <>
            <div className="background">
                <div className="message"><h1 className="message-text">{this.state.message}</h1></div>
                <div className="home-module">
                    {this.props.seasonal}
                </div>
            </div>
        </>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyTemplate);
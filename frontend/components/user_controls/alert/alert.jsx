import "./alert.css"
import {createAlert, deleteAlert} from "../../../actions/alert_action";
import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";


const mapStateToProps = (state, ownProps)=> ({
    alert: state.ui.alerts
})

const mapDispatchToProps = dispatch => ({
    createAlert: (type, message, timeout=5000) => dispatch(createAlert(type, message, timeout)),
    deleteAlert: () => dispatch(deleteAlert())
})

class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    alertClose() {
        if (Object.keys(this.props.alert).length) {
            this.props.deleteAlert()
        }
    }

    render() {
        return Object.keys(this.props.alert).length ?
            <div className={`alert alert-block alert-${this.props.alert.type} fade in`} onClick={() => this.props.deleteAlert()}>
                <button type="button" className="close" onClick={this.alertClose.bind(this)}>×
                </button>
                {this.props.alert.message}
            </div> : null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
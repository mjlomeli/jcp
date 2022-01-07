import {connect} from 'react-redux';
import {deleteSession} from '../../actions/session_action';
import Greeting from './greeting';

const mapStateToProps = ({session, entities: {user}}) => ({
    currentUser: user[session.id]
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(deleteSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);

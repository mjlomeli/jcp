import {connect} from 'react-redux';
import {deleteSession} from '../../actions/session_actions';
import Greeting from './greeting';

const mapStateToProps = ({session, entities: {users}}) => ({
    currentUser: users[session.id]
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(deleteSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);

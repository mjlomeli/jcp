import * as SessionAPIUtil from '../utils/session';

export const RECEIVE_USER = `RECEIVE_USER`;
export const RECEIVE_SESSION = `RECEIVE_SESSION`;
export const REMOVE_SESSION = `REMOVE_SESSION`;

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user: user
})

const receiveSession = (session) => ({
    type: RECEIVE_SESSION,
    session: session
})

const removeSession = (sessionId) => ({
    type: REMOVE_SESSION,
    sessionId: sessionId
})





export const createUser = (user) => dispatch => (
    SessionAPIUtil.createUser(user).then(
        user => dispatch(receiveUser(user))
    )
)

export const createSession = (session) => dispatch => (
    SessionAPIUtil.createSession(session).then(
        session => dispatch(receiveSession(session))
    )
)

export const deleteSession = (sessionId) => dispatch => (
    SessionAPIUtil.deleteSession(sessionId).then(
        session => dispatch(removeSession(session))
    )
)
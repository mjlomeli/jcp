import * as AlertUtil from "../utils/ui_alert_util";

export const RECEIVE_ALERT = "RECEIVE_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";


const receiveAlert = (alert, timeoutId) => ({
    type: RECEIVE_ALERT,
    alert: alert,
    timeoutId: timeoutId
})

const removeAlert = () => ({
    type: REMOVE_ALERT
})


export const systemError = (message, timeout=5000) => (dispatch, getState) => {
    return AlertUtil.createAlert("error", message.join("\n")).then(
        alert => {
            let prevTimeout = fetchTimoutId(getState);
            clearTimeout(prevTimeout)
            let timeoutId = setTimeout(() => deleteAlert()(dispatch, getState), timeout);
            return dispatch(receiveAlert(alert, timeoutId))
        }
)};


export const notification = (message, timeout=5000) => (dispatch, getState) => {
    return AlertUtil.createAlert("notification", message).then(
        alert => {
            let prevTimeout = fetchTimoutId(getState);
            clearTimeout(prevTimeout)
            let timeoutId = setTimeout(() => deleteAlert()(dispatch, getState), timeout);
            return dispatch(receiveAlert(alert, timeoutId))
        }
)};


export const caution = (message, timeout=5000) => (dispatch, getState) => {
    return AlertUtil.createAlert("warning", message).then(
        alert => {
            let prevTimeout = fetchTimoutId(getState);
            clearTimeout(prevTimeout)
            let timeoutId = setTimeout(() => deleteAlert()(dispatch, getState), timeout);
            return dispatch(receiveAlert(alert, timeoutId))
        }
)};


export const success = (message, timeout=5000) => (dispatch, getState) => {
    return AlertUtil.createAlert("success", message).then(
        alert => {
            let prevTimeout = fetchTimoutId(getState);
            clearTimeout(prevTimeout)
            let timeoutId = setTimeout(() => deleteAlert()(dispatch, getState), timeout);
            return dispatch(receiveAlert(alert, timeoutId))
        }
)};


const fetchTimoutId = (getState) => {
    let alert = getState().ui.alert;
    return !!Object.keys(alert).length ? alert.timeoutId : null;
}

export const createAlert = (type, message, timeout=5000) => (dispatch, getState) => {
    return AlertUtil.createAlert(type, message).then(
        alert => {
            let prevTimeout = fetchTimoutId(getState);
            clearTimeout(prevTimeout)
            let timeoutId = setTimeout(() => deleteAlert()(dispatch, getState), timeout);
            return dispatch(receiveAlert(alert, timeoutId))
        }
)};


export const deleteAlert = () => (dispatch, getState) => {
    AlertUtil.deleteAlert().then(
        alert => {
            let prevTimeout = fetchTimoutId(getState);
            clearTimeout(prevTimeout)
            dispatch(removeAlert())
        }
)};


window.AlertAction = {
    systemError,
    notification,
    caution,
    success,
    createAlert,
    deleteAlert
}
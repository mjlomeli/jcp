export const fetchPage = (reducer, id, getState) => {
    return new Promise((resolve, reject) => {
        if (!getState)
            reject({responseJSON: "getState does not exist"})
        let state = getState();
        if (!state.ui) {
            reject({responseJSON: "UI state doesn't exist"})
        } else if (!reducer){
            reject({responseJSON: "Must pass in a reducer"})
        } else if (!id){
            reject({responseJSON: "Must pass in an id"})
        } else if (!state.ui.page) {
            reject({responseJSON: "The ui.page doesn't exist in the UI state"})
        } else if (!state.ui.page[reducer]) {
            reject({responseJSON: `The ui.page.${reducer} doesn't exist in the UI state`})
        } else {
            resolve(state.ui.page[reducer][uuid.id])
        }
    })
}

export const updatePage = (reducer, id, ui) => {
    return new Promise((resolve, reject) => {
        if (!ui) {
            reject({responseJSON: "No ui was given"})
        } else if (!id) {
            reject({responseJSON: "No id was given"})
        } else if (!reducer) {
            reject({responseJSON: "No reducer was given"})
        } else {
            resolve({reducer: reducer, id: id, ui: ui})
        }
    })
}

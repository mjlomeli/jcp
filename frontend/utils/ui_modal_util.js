export const createLogin = (state) => {
    return new Promise((resolve, reject) => {
        if (!state.session.id) {
            resolve(true)
        } else {
            reject(false)
        }
    })
}

export const createRegister = (state) => {
    return new Promise((resolve, reject) => {
        if (!state.session.id) {
            resolve(true)
        } else {
            reject(false)
        }
    })
}
export const updateProductUIUtil = product => {
    return new Promise((resolve, reject) => {
        if (!product) {
            reject({responseJSON: "No product was given"})
        } else {
            resolve(product)
        }
    })
}


export const deleteProductUIUtil = (productId, getState) => {
    return new Promise((resolve, reject) => {
        if (!getState)
            reject({responseJSON: "getState does not exist"})
        let state = getState();
        if (!state.ui) {
            reject({responseJSON: "UI state doesn't exist"})
        } else if (!state.ui.product){
            reject({responseJSON: "Product doesn't exist in the UI state"})
        }
        else {
            resolve(state.ui.product[productId])
        }
    })
}
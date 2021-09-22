export const __updateUserCredential = (data) => {
    return dispatch => {
        dispatch({
            type: 'UPDATE_USER_CREDENTIAL',
            payload: data
        })
    }
}

export const __getUserCredential = () => {
    return dispatch => {
        dispatch({
            type: 'GET_USER_CREDENTIAL'
        })
    }
}
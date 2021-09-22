// export const __updateUserCredential = (data) => {
//     return dispatch => {
//         dispatch({
//             type: 'UPDATE_USER_CREDENTIAL',
//             payload: data
//         })
//     }
// }

export const __getComponentData = (name) => {
    let dataName = name.toUpperCase()
    return dispatch => {
        dispatch({
            type:  `GET_DATA_OF_${dataName}`
        })
    }
}
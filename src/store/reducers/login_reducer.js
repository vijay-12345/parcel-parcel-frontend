const defaultState = {
    user : {
        username : '',
        token : '',
        isAuthenticated : false
    }
}


export default (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_CREDENTIAL':
            return {
                ...state,
                user : action.payload
            }
        default :
        return {
            ...state
        }
    }
}
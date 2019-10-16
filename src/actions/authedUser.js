// action types
export const SET_AUTHED_USER = "SET_AUTHED_USER"
export const LOG_OUT = 'LOG_OUT'

// action creators
export function setAuthedUser(authedId){
    return {
        type: SET_AUTHED_USER,
        authedId
    }
}

export function logOutUser(){
    return {
        type: LOG_OUT,
    }
}

// action handlers
// no need // dispatch 
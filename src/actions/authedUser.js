// action types
export const SET_AUTHED_USER = "SET_AUTHED_USER"
// action creators

export function setAuthedUser(userId){
    return {
        type: SET_AUTHED_USER,
        userId
    }
}

// action handlers
// no need // dispatch 
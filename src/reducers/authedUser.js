// import action types
import { SET_AUTHED_USER, LOG_OUT } from '../actions/authedUser'

export default function authedUser(state = null, action){
    switch(action.type){
        case SET_AUTHED_USER:
            return action.authedId
        case LOG_OUT:
            return null // return back to null
        default : 
            return state
    }

}
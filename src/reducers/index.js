// combine reducers
import { combineReducers } from "redux"
import authedUser from './authedUser'
import users from './users'
import questions from './questions'

export default combineReducers({
    users,
    authedUser,
    questions
})
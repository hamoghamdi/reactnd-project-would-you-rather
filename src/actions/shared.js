import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
// import from api
import { getInitialData } from '../utils/api'

export function handleInitialData(authedId){ // receive id from UI
    return (dispatch)=>{
        return getInitialData().then(( {users, questions} )=>{
            dispatch(setAuthedUser(authedId))
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}
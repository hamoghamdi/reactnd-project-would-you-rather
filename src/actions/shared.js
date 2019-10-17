import { receiveUsers, addUserQuestion, addUserAnswer } from './users'
import { receiveQuestions, addQuestion, addAnswer } from './questions'
import { setAuthedUser } from './authedUser'
// import from api
import { getInitialData, saveAnswer, saveQuestion } from "../utils/api"

export function handleInitialData(authedId){ // receive id from UI
    return (dispatch)=>{
        return getInitialData().then(( {users, questions} )=>{
            dispatch(setAuthedUser(authedId))
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
        })
    }
}

// question coming from react = {optionOneText, optionTwoText, author}
export function handleAddQuestion(question){
    return (dispatch)=>{
        const authedUser  = question.author
        return saveQuestion(question).then((q)=>{
            const qid = q.id
            dispatch(addQuestion(q))
            dispatch(addUserQuestion({qid, authedUser}))
        })
    }

}

// answer = { authedUser, qid, answer }
export function handleAddAnswer({ authedUser, qid, answer }) {
    return dispatch => {
        return saveAnswer({ authedUser, qid, answer }).then(() => {
            dispatch(addAnswer({ authedUser, qid, answer }))
            dispatch(addUserAnswer({ authedUser, qid, answer }))
            })
            .catch(err => console.log("Error in handleAddAnswer: ", err));
        }
}
// API calls
import { saveAnswer, saveQuestion } from '../utils/api'

// action types
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS" // MOVE TO SHARED or EXPORT TO SHARED
export const ADD_QUESTION = "ADD_QUESTION"
export const ADD_ANSWER = "ADD_ANSWER"

// action creators
export function receiveQuestions(){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

function addAnswer(answer){
    return {
        type: ADD_ANSWER,
        answer
    }
}

// action handlers
// question coming from react = {optionOneText, optionTwoText, author}
export function handleAddQuestion(question){
    return (dispatch)=>{
        // const { authedUser } = getState()
        return saveQuestion(question).then((q)=>{
            dispatch(addQuestion(q))

        })
    }

}

// answer = { authedUser, qid, answer }
export function handleAddAnswer(answer){
    return (dispatch)=>{
        return saveAnswer(answer).then((ansr)=>{
            dispatch(addAnswer(ansr)).catch(err => console.warn("Error in handleAddAnswer: ", err))
        })
    }

}
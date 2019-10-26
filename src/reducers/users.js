// import action types
import { RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users'


export default function users(state={}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.qid])
                }
            }
        case ADD_USER_ANSWER: // { [qid]: answer }
            return {
              ...state,
              [action.authedUser]: {
                ...state[action.authedUser],
                answers: {
                  ...state[action.authedUser].answers,
                  [action.qid]: action.answer
                }
              }
            };
        default : 
            return state
    }
}
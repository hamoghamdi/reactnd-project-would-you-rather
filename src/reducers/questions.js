// import action types
import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER} from '../actions/questions'

export default function questions(state={}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                ...state.concat[action.question]
            }
        case ADD_ANSWER:
            return {
                ...state,
                // find the q it answers then add in the votes // still needs work on algorithm
            }
        default :
            return state
    }

}
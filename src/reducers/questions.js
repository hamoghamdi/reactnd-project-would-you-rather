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
                [action.question.id]: action.question
            }
            // answer = { authedUser, qid, answer }
        case ADD_ANSWER:
            return {
                ...state,
                // find the q it answers then add in the votes
                [action.qid]: {
                ...state[action.qid],
                [action.answer]: {
                    ...state[action.qid][action.answer],
                    votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            };
        default :
            return state
    }

}
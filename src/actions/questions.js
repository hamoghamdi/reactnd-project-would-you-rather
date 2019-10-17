// API calls

// action types
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS" // MOVE TO SHARED or EXPORT TO SHARED
export const ADD_QUESTION = "ADD_QUESTION"
export const ADD_ANSWER = "ADD_ANSWER"

// action creators
export function receiveQuestions(questions) {
        return {
        type: RECEIVE_QUESTIONS,
        questions
        };
    }

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

// answerInfo = { authedUser, qid, answer }
export function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser, qid, answer 
  };
}

// action handlers

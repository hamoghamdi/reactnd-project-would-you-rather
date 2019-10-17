// API calls import 

// actions types
export const RECEIVE_USERS = "RECEIVE_USERS"
export const ADD_USER_QUESTION = "ADD_USER_QUESTION"
export const ADD_USER_ANSWER = "ADD_USER_ANSWER"

// action creators
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function addUserQuestion({qid, authedUser}){
  return {
    type: ADD_USER_QUESTION,
    qid,
    authedUser
  }
}
export function addUserAnswer({qid, answer, authedUser}){
  return {
    type: ADD_USER_ANSWER,
    qid,
    answer,
    authedUser
  }
}
// action handlers
// API calls import 

// actions types
export const RECEIVE_USERS = "RECEIVE_USERS"

// action creators
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

// action handlers
import {
_getQuestions,
_getUsers,
_saveQuestion,
_saveQuestionAnswer
} from "./_DATA";

export function getInitialData(){
    return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
        users,
        questions
    })
    );
}

export function saveQuestion(info){
    return _saveQuestion(info)
}

export function saveAnswer({ authedUser, qid, answer }) {
    console.log("api>>>>>>>>>>>", authedUser, qid, answer );
        return _saveQuestionAnswer({ authedUser, qid, answer });
    }

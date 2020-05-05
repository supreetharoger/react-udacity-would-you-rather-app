import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers } from '../actions/users'


export const RECEIVE_QUESTIONS='RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function addUserQuestion(question, users) {
  return {
    type: ADD_USER_QUESTION,
    question,
    users
  }
}

export function handleNewQuestion(optionOne, optionTwo) {
  return(dispatch, getState) => {
    const { authedUser, users } = getState()
    dispatch(showLoading)
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    })
    .then((question) => {
          dispatch(addQuestion(question))
          dispatch(addUserQuestion(question, users))
    })
    .then(() => dispatch(hideLoading))
  }
}

export function handlePollQuestion(option, qid) {
  return(dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading)
    return saveQuestionAnswer({
      answer: option,
      qid: qid,
      authedUser: authedUser
    })
    .then(({users, questions}) => {     
       dispatch(receiveUsers(users))
       dispatch(receiveQuestions(questions))
       })
    .then(() => dispatch(hideLoading))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
import { getInitialData, getSigninData} from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData(id) {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
    	.then(({users, questions}) => {
      		localStorage.setItem('usertoken', id)
      		dispatch(receiveUsers(users))
      		dispatch(setAuthedUser(localStorage.getItem('usertoken')))
      		dispatch(receiveQuestions(questions))
      		dispatch(hideLoading())
    })
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('usertoken')
    dispatch(setAuthedUser({}))
    dispatch(showLoading())
    return getSigninData()
    	.then(({users}) => {
      		dispatch(receiveUsers(users))
      		dispatch(hideLoading())
    })
  }
}


export function handleAuthentication() {
  return (dispatch) => {
  const auth = localStorage.getItem('usertoken')
  if(auth == null) {
    dispatch(showLoading())
    return getSigninData()
    	.then(({users}) => {
      		dispatch(receiveUsers(users))
      		dispatch(hideLoading())
    })
  }else {
    dispatch(showLoading())
    return getInitialData()
    	.then(({users, questions}) => {
      		dispatch(receiveUsers(users))
      		dispatch(setAuthedUser(localStorage.getItem('usertoken')))
      		dispatch(receiveQuestions(questions))
      		dispatch(hideLoading())
    })
   }
  }
}


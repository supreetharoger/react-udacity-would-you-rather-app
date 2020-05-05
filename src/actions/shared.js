import { getInitialData, getSigninData} from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
  return (dispatch) => {
     dispatch(showLoading())
    return getSigninData()
    	.then(({users}) => {
      		dispatch(receiveUsers(users))
      		dispatch(hideLoading())
    })
  }
}
export function logout() {
  return (dispatch) => {
    dispatch(setAuthedUser(null))
    dispatch(showLoading())
    return getSigninData()
    	.then(({users}) => {
      		dispatch(receiveUsers(users))
      		dispatch(hideLoading())
    })
  }
}

export function signinData(id) {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
    	.then(({users, questions}) => {
      		dispatch(receiveUsers(users))
      		dispatch(setAuthedUser(id))
      		dispatch(receiveQuestions(questions))
      		dispatch(hideLoading())
    })
  }
}
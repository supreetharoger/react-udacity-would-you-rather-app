import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAuthentication } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Navigation from './Navigation'
import Poll from './Poll'
import PollResults from './PollResults'
import Signin from './Signin'
import Answered from './Answered'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleAuthentication())
  }
  
  render() { 
    const auth = this.props.authedUser && Object.keys(this.props.authedUser).length
    return (
      <Router>
      <Fragment>
      <LoadingBar />
      {(this.props.authedUser !== null && auth !== 0 ) &&
       <Navigation />}
       {(this.props.authedUser === null || auth === 0 )  && 
       <div>
        		<Route path="/" component={Signin} />
		</div> }
      {(this.props.authedUser !== null || auth !== 0) && this.props.loading && this.props.loading === true ? null :
		<div>
			<Route path="/home" exact component={Dashboard} />
      		<Route path="/add" component={NewQuestion} />
			<Route path="/questions/:id" component={Poll} />
			<Route path="/poll/:id" component={PollResults} />
	  		<Route path="/leaderboard" component={Leaderboard} />
			<Route path="/answered" component={Answered} />
		</div>}
     
      </Fragment>
	  </Router>
      )
  }
}

function mapStateProps({authedUser}) {
  const auth = authedUser && Object.keys(authedUser).length
  return {
    loading: authedUser === null || auth === 0 ,
    authedUser
  }
}
 
 export default connect(mapStateProps)(App)
  
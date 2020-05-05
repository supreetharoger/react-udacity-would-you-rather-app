import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Navigation from './Navigation'
import Poll from './Poll'
import PollResults from './PollResults'
import Signin from './Signin'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import PageNotFound from './PageNotFound'
import Error from './Error'

class App extends Component {
  state = {
    loading: false
  }
  componentDidMount() {
    this.props.dispatch(handleInitialData())
	.then(() => {
      this.setState({
        loading: true
      })
    })
  }
  
  render() { 
	const { loading } = this.state
    return (
      <Router>
      <Fragment>
      <LoadingBar />
      <Navigation />  
     <div>
      		
      {loading && <Switch>
       			<PublicRoute authedUser={this.props.authedUser} path="/" exact />
       			<Route path="/login" component={Signin} />
				<PrivateRoute authedUser={this.props.authedUser} path="/home" exact component={Dashboard} />
      			<PrivateRoute authedUser={this.props.authedUser} path="/add" component={NewQuestion} />
				<PrivateRoute authedUser={this.props.authedUser} path="/questions/:id" component={Poll} />
				<PrivateRoute authedUser={this.props.authedUser} path="/poll/:id" component={PollResults} />
	  			<Route path="/leaderboard" component={Leaderboard} />
				<Route path="/error" component={Error} />
				<Route component={PageNotFound} />
			</Switch>}
		</div>
      </Fragment>
	  </Router>
      )
  }
}

function mapStateProps({authedUser}) {
  return {
    authedUser
  }
}
 
 export default connect(mapStateProps)(App)
  
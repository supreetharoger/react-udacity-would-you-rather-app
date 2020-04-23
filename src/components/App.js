import React, { Component, fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Navigation from './Navigation'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <Router>
      <div>
      <LoadingBar />
      <Navigation />
      {this.props.loading && this.props.loading === true ? null :
       <div>
      		<Route path="/" exact component={Dashboard} />
      		<Route path="/new" component={NewQuestion} />
	  		<Route path="/lb" component={Leaderboard} />
		</div>
      }
      </div>
	  </Router>
      )
  }
}

function mapStateProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}
 
 export default connect(mapStateProps)(App)
  
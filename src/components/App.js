import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <div>
      <LoadingBar />
      {this.props.loading && this.props.loading === true ? null :
      <Leaderboard />}
      </div>
      )
  }
}

function mapStateProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}
 
 export default connect(mapStateProps)(App)
  
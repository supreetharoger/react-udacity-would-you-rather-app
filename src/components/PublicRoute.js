import React from 'react'
import { Redirect, Route} from 'react-router-dom'
import { connect } from 'react-redux'

const PublicRoute = ({ component: Component, authedUser, ...rest }) => {
  return <Route {...rest} render={(props) => (
    authedUser
  			? <Redirect to={{
          			pathname: '/home',
          			state: { from: props.location }
        		}} />
  			: <Redirect to={{
          			pathname: '/login',
          			state: { from: props.location }
        		}} />
  )} />
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

export default connect(mapStateToProps)(PublicRoute)
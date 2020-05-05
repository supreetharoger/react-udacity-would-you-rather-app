import React from 'react'
import { Redirect, Route} from 'react-router-dom'
import { isAuthenticated } from '../utils/helpers'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => (
    isAuthenticated()
  			? <Component {...props} /> 
  			: <Redirect to={{
          			pathname: '/login',
          			state: { from: props.location }
        		}} />
  )} />
	
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

export default connect(mapStateToProps)(PrivateRoute)
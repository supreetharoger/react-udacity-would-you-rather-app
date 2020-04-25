import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class Navigation extends Component {
  state = {
    logd: false
  }

  logout = (e) => {
    e.preventDefault()
    this.props.logout()
    this.setState({
      logd: true
    })
  }

  render() {
    const { authedUser } = this.props
	const { logd } = this.state
	if(logd) {
      return <Redirect to="/" />
    }

    return (
      	<div>
      	<ul className="navigation-div">
      		<li className="navigation-li">
      			<NavLink to="/home" exact activeClassName="active" className="navigation-link">Home</NavLink>
      		</li>
      		<li className="navigation-li">
      			<NavLink to="/add" className="navigation-link" activeClassName="active">New Question</NavLink>
      		</li>
      		<li className="navigation-li">
      			<NavLink to="/leaderboard" className="navigation-link" activeClassName="active">Leaderboard</NavLink>
      		</li>
         { authedUser &&
      		<li className="navigation-li-user"><span>Hello {authedUser}</span></li>}
         { authedUser &&
          	<li className="navigation-li-user">
				<span><a href="#" onClick={this.logout}>Logout</a></span>
  			</li>  }
      	</ul>
      	<hr />
      	</div>
      
      )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps, { logout } )(Navigation)
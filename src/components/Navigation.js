import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../actions/shared'

class Navigation extends Component {

  logout = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { authedUser, username } = this.props

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
      		<li className="navigation-li-user"><span>Hello {username}</span></li>}
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

function mapStateToProps({authedUser, users}) {
  const username = users[authedUser] ? users[authedUser].name : authedUser
  return {
    authedUser,
    username
  }
}
export default connect(mapStateToProps, { logout } )(Navigation)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      	<div>
      	<ul className="navigation-div">
      		<li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
      		<li><NavLink to="/new" activeClassName="active">New Question</NavLink></li>
      		<li><NavLink to="/lb" activeClassName="active">Leaderboard</NavLink></li>
      		<li>Hello</li>
      	</ul>
      	<hr />
      	</div>
      
      )
  }
}


export default connect()(Navigation)
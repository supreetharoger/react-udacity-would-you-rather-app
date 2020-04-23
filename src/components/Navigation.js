import React, { Component } from 'react'
import { connect } from 'react-redux'

class Navigation extends Component {
  render() {
    return (
      	<div>
      	<ul className="navigation-div">
      		<li><a href="#">Home</a></li>
      		<li><a href="#">New Question</a></li>
      		<li><a href="#">Leaderboard</a></li>
      		<li>Hello</li>
      	</ul>
      	<hr />
      	</div>
      
      )
  }
}


export default connect()(Navigation)
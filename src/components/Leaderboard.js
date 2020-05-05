import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserLeaderboard from './UserLeaderboard'
import { sortLeaderboard } from '../utils/helpers'

class Leaderboard extends Component {
  render() {
    const { userIds } = this.props
    return (
      	<ul className="lb">
      		{userIds && userIds.map((id) => (
      			<li key={id}>
					<UserLeaderboard id={id} />
				</li>
      		))}
      	</ul>
     
      )
  }
}

function mapStateToProps({users}) {
  return {
    userIds: sortLeaderboard(users)
  }
}
export default connect(mapStateToProps)(Leaderboard)
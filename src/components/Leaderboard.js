import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserLeaderboard from './UserLeaderboard'

class Leaderboard extends Component {
  render() {
    const { userIds } = this.props
    console.log(userIds)
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
    userIds: Object.keys(users)
  }
}
export default connect(mapStateToProps)(Leaderboard)
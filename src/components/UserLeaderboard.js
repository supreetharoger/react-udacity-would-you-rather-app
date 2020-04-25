import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatUserLeaderboard } from '../utils/helpers'

class UserLeaderboard extends Component {
  render() {
    const { user } = this.props
    return (
       	<div className="leaderboard">
      		<div className="lb-avatar">
      			<img src={user.avatarURL} className="avatar" alt="avatar" />
      		</div>
      		<div className="lb-details">
      			<h3>{user.name}</h3>
				<div><span>Answered questions</span> <span>{user.answeredquestions}</span></div>
				<div><span>Created questions</span><span>{user.createdquestions}</span></div>
      		</div>
      		<div className="lb-score">
      			<div className="lb-score-div">Score</div>
				<div>{user.score}</div>
      		</div>
      	</div>
      )
  }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
  const user = users[id]
  return {
    user: formatUserLeaderboard(user)
  }
}

export default connect(mapStateToProps)(UserLeaderboard)
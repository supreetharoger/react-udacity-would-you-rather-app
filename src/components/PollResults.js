import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPollResults } from '../utils/helpers'

class PollResults extends Component {
  render() {
    const { question } = this.props
    return (
      	<div className="poll">
       <div className="question-title">
        <span> Asked by </span> {question.username}
		</div>
		<div className="question-content">
		<div className="question-avatar">
			<img className="avatar" src={question.avatarURL} alt="avatar" />
		</div>
		<div className="question-poll">
			<h3>Results</h3>
			<div className="poll-results">
				{question.answeredOption === 'optionOne' && <div className="pollvote">Your vote</div>}
				<span>Would you rather {question.optionOne.text}?</span>
				<div className="resultsbar">
					<div style={{width: question.optionOnePercentage + '%'}}>
						<span>{question.optionOnePercentage}%</span>
					</div>
				</div>
				<span>{question.optionOneVotes} out of {question.totalVotes} votes</span>
			</div>
			<div className="poll-results">
				{question.answeredOption === 'optionTwo' && <div className="pollvote">Your vote</div>}
				<span>Would you rather {question.optionTwo.text}?</span>
				<div className="resultsbar">
					<div style={{width: question.optionTwoPercentage + '%'}}>
						<span>{question.optionTwoPercentage}%</span>
					</div>
				</div>
				<span>{question.optionTwoVotes} out of {question.totalVotes} votes</span>
			</div>
		</div>
		</div>
      </div>
      )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const id  = props.id
  const question = questions[id]
  return {
    question: formatPollResults(question, users[question.author], users[authedUser]),
    id: question.id
  }
  }

export default connect(mapStateToProps)(PollResults)
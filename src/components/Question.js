import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class Question extends Component {
  render() {
    const { question } = this.props
	console.log("Question", question)

    return (
      <div className="question">
       <div className="question-title">
        {question.username} <span> asks</span>
		</div>
		<div className="question-content">
		<div className="question-avatar">
			<img className="avatar" src={question.avatarURL} />
		</div>
		<div className="question-poll">
			Would you rather
			<button>View Poll</button>
		</div>
		</div>
      </div>
      )
  }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
  const question = questions[id]
  return {
    question: formatQuestion(question, users[question.author], authedUser)
  }
}

export default connect(mapStateToProps)(Question)
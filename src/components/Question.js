import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link } from 'react-router-dom'

class Question extends Component {
  render() {
    const { question, answered } = this.props

    return (
      <div className="question">
       <div className="question-title">
        {question.username} <span> asks</span>
		</div>
		<div className="question-content">
		<div className="question-avatar">
			<img className="avatar" src={question.avatarURL} alt="avatar"/>
		</div>
		<div className="question-poll">
			<span> Would you rather {question.optionOne.text} OR {question.optionTwo.text}</span>
			{!answered ? 
			<Link to={`/questions/${question.id}`}>
			<button>View Poll</button>
			</Link> :
			<Link to={`/poll/${question.id}`}>
			<button>View Poll</button>
			</Link> }
		</div>
		</div>
      </div>
      )
  }
}

function mapStateToProps({authedUser, users, questions}, props) {
  const id = props.id
  const answered = props.answered
  const question = questions[id]

  return {
    question: formatQuestion(question, users[question.author], authedUser),
	answered
  }
}

export default connect(mapStateToProps)(Question)
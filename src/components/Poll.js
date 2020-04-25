import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handlePollQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class Poll extends Component {
  state = {
    selectedOption: '',
    toPollResults: false
  }

  handleChange = (e) => {
    const option = e.target.value
    this.setState({
      selectedOption: option
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { selectedOption } = this.state
    const { dispatch, id } = this.props
    if(selectedOption === '') {
      alert('Select an option')
      return
    }
    dispatch(handlePollQuestion(selectedOption, id))
    
 	this.setState(() => ({
      selectedOption: '',
      toPollResults: true
    }))
  }

  render() {
    const { question } = this.props
	const { toPollResults } = this.state

	if(toPollResults) {
      return <Redirect to={`/poll/${question.id}`} />
    }

    return (
      	<div className="poll">
       <div className="question-title">
        {question.username} <span> asks</span>
		</div>
		<div className="question-content">
		<div className="question-avatar">
			<img className="avatar" src={question.avatarURL} alt="avatar" />
		</div>
		<div className="question-poll">
			Would You Rather...
				<form onSubmit={this.handleSubmit}>
				<div className="radio">
				<label>
					<input type="radio" name="option" onChange={this.handleChange} value="optionOne"/>
					{question.optionOne.text}</label></div>
				<div className="radio">
				<label>
					<input type="radio" name="option" onChange={this.handleChange} value="optionTwo"/>
					{question.optionTwo.text}</label></div>
				<button type="submit">Submit</button>
			</form>
		</div>
		</div>
      </div>
      )
  }
}
function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  return {
    question: formatQuestion(question, users[question.author], authedUser),
    id: question.id
  }
  }

export default connect(mapStateToProps)(Poll)
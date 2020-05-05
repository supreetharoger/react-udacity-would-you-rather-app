import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, checkUserAnswered } from '../utils/helpers'
import { handlePollQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import PollResults from './PollResults'

class Poll extends Component {
  state = {
    selectedOption: ''
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
    .then(() => {
 	this.setState(() => ({
      selectedOption: ''
    }))
    })
  }

  render() {
    if (this.props.error && this.props.error.exists) {
    	return <Redirect to='/error' />
	}
    const { question, answered } = this.props
	
    return (
     <div>
      {(!answered) && <div className="poll">
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
      </div> }
{ (answered )&& 
 <div> <PollResults id={question.id}/> </div> }
 </div>
      )
  }
}
function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  if(question === undefined) {
	return {
		error: {exists: true, name: "Question does not exist"}
	}
  }
  return {
    question: formatQuestion(question, users[question.author], authedUser),
    answered: checkUserAnswered(question, users[authedUser]),
    id: question.id
  }
  }

export default connect(mapStateToProps)(Poll)
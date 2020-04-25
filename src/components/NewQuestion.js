import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom' 
  
class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }

  handleOptionOneChange = (e) => {
    const text = e.target.value
    this.setState({
      optionOne: text
    })
  }
  handleOptionTwoChange = (e) => {
    const text = e.target.value
    this.setState({
      optionTwo: text
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props
    if(optionOne === '' || optionTwo === '') {
      alert("Please provide options")
      return
    }
    dispatch(handleNewQuestion(optionOne, optionTwo))
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true
    }))
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state

	if(toHome) {
      return <Redirect to="/home" />
    }

    return (
      	<div className="newquestion">
      		<div className="newquestion-title">
      			<h3> Create New Question </h3>
      		</div>
      		<form onSubmit={this.handleSubmit}>
      			<span>Would you rather ...</span>
      			<input type="text" value={optionOne} onChange={this.handleOptionOneChange} name="optionOne" />
      			<span>OR</span>
      			<input type="text" onChange={this.handleOptionTwoChange} value={optionTwo} ame="optionTwo" />
      			<button type="submit">Submit</button>
      		</form>
      	</div>
      )
  }
}

export default connect()(NewQuestion)
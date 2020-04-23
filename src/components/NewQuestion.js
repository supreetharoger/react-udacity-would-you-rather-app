import React, { Component } from 'react'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import { handleNewQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }

  handleOptionOneChange = (e) => {
    const text = e.target.value
    console.log(e.target.name)
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
    console.log("Option name", optionOne)
    console.log("Option Two", optionTwo)
    
    dispatch(handleNewQuestion(optionOne, optionTwo))
    
    this.setState(() => ({
      optionOne: '',
      optionTwo: ''
    }))
  }

  render() {
    const { optionOne, optionTwo } = this.state

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
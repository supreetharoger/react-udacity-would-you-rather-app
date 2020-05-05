import React, { Component } from 'react'
import { connect } from 'react-redux' 
import Question from './Question'
import { getSortedQuestions } from '../utils/helpers'

class Dashboard extends Component {
  
  state = {
    showAnsweredQuestions: false
  }

  checkQuestion = (answered) => {
    this.setState({
      showAnsweredQuestions: answered
    })
  }
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props.sortedQuestions
	const { showAnsweredQuestions } = this.state
    return (
      <div className="list-questions">
      	<div className="questions-title">
      		<div className="questions-header"><a href="#" onClick={() => this.checkQuestion(false)} >Unanswered Questions</a></div>
      		<div className="questions-header"><a href="#" onClick={() => this.checkQuestion(true)}>Answered Questions</a></div>
      	</div>
{ !showAnsweredQuestions && <div className="questions-content">
       <ul>
      			{Object.entries(unansweredQuestions).length !== 0 && unansweredQuestions.map((id) => (
     				<li key={id}>
      					<Question id={id} />
      				</li>
    			))}
			 </ul> 
		</div> }
{showAnsweredQuestions && <div className="questions-content">
       <ul>
      			{Object.entries(answeredQuestions).length !== 0 && answeredQuestions.map((id) => (
     				<li key={id}>
      					<Question id={id} />
      				</li>
    			))}
			 </ul> 
		</div> }
      </div>
      )
  }
}
  
function mapStateToProps({ questions, authedUser, users }) {
  return {
    sortedQuestions : getSortedQuestions(questions, authedUser, users),
  }
}
  export default connect(mapStateToProps)(Dashboard)
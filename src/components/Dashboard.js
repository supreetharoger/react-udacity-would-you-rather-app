import React, { Component } from 'react'
import { connect } from 'react-redux' 
import Question from './Question'
import { Link } from 'react-router-dom'
import { getUnansweredQuestions } from '../utils/helpers'

class Dashboard extends Component {

  render() {
    return (
      <div className="list-questions">
      	<div className="questions-title">
      		<div className="questions-header"><Link to="/home" >Unanswered Questions</Link></div>
      		<div className="questions-header"><Link to="/answered">Answered Questions</Link></div>
      	</div>
      	<div className="questions-content">
       <ul>
      			{this.props.questionIds.map((id) => (
     				<li key={id}>
      					<Question id={id} answered={false} />
      				</li>
    			))}
			 </ul> 
		</div>
      </div>
      )
  }
}
  
function mapStateToProps({ questions, authedUser }) {
  return {
    questionIds : getUnansweredQuestions(questions, authedUser),
  }
}
  export default connect(mapStateToProps)(Dashboard)
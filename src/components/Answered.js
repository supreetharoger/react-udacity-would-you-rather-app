import React, { Component } from 'react'
import { connect } from 'react-redux' 
import Question from './Question'
import { Link } from 'react-router-dom'

class Answered extends Component {
  
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
      					<Question id={id} answered={true}/> 
      				</li>
    			))}
			 </ul> 
		</div>
      </div>
      )
  }
}
  
function mapStateToProps({ authedUser, users }) {
  const userID = authedUser
  return {
    questionIds: Object.keys(users[userID].answers),
  }
}
  export default connect(mapStateToProps)(Answered)
import React, { Component } from 'react'
import { connect } from 'react-redux' 
import Question from './Question'
import Navigation from './Navigation'

class Dashboard extends Component {
  render() {
    console.log("KP",this.props.questionIds.length)
    return (
      <div className="list-questions">
      	<div className="list-questions-title">
      		<h3>Would You Rather?</h3>
      	</div>
      	<Navigation />
      	<div className="questions-title">
      		<div className="questions-header"><a href="#">Unanswered Questions</a></div>
      		<div className="questions-header"><a href="#">Answered Questions</a></div>
      	</div>
      	<div className="questions-content">
      		 <ul>
      			{this.props.questionIds.map((id) => (
      				<li key={id}>
      					<Question id={id}/>
      				</li>
    			))}
			 </ul>
		</div>
      </div>
      )
  }
}
  
function mapStateToProps({ questions }) {
  return {
    questionIds : Object.keys(questions),
  }
}
  export default connect(mapStateToProps)(Dashboard)
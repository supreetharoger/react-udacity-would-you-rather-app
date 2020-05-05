import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactLogo from '../logo.svg'
import { handleInitialData } from '../actions/shared'
import { Redirect } from 'react-router-dom' 

class Signin extends Component {
  
  state = {
    option: '',
    toHome: false
  }

  handleChange = (e) => {    
    this.setState({
      option: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { option } = this.state
    const { dispatch } = this.props
    
    if(option === '') {
      alert("Please select User")
      return
    }
    dispatch(handleInitialData(option))
    .then(() => {
    	this.setState(() => ({
      		option: '',
      		toHome: true
    	}))
    })
    
  }

  render () {
    const { users, pathname } = this.props
	const { toHome } = this.state

	if(toHome) {
      return <Redirect to={{
          pathname: pathname,
          state: { from: this.props.location }
        }} />
    }

    return (
    	<div className="signin">
         	<div className="signin-title">
         		<h3>Welcome to Would You Rather App!</h3>
         		<span>Please signin to continue</span>
         	</div>
         	<div className="signin-img">
      			<img src={ReactLogo} alt="react logo" />
         	</div>
			<div className="signin-select">
				<form onSubmit={this.handleSubmit}>
         		<select defaultValue="" onChange={this.handleChange}>
					<option disabled></option>
					{Object.keys(users).map((id) => (
  						<option key={id} value={id}>
                             {users[id].name}</option>
					))}
         			
         		</select>
				<button type="submit">Sign In</button>
				</form>
			</div>
         </div>
    )
  }
  }

function mapStateToProps({users}, props) {
  const pathname = props.location.state ? props.location.state.from.pathname : '/home'
  return {
    users: users,
    pathname
  }
}

export default connect(mapStateToProps)(Signin)
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Error extends Component {
  render() {
    return (
      <div className="error">Error occured in retrieving the details</div>
      )
  }
}

export default connect()(Error)
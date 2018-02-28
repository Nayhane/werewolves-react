import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
//components

class MessageBox extends PureComponent {

  render() {
    const { onClick } = this.props
    
    return (
      <div style={{ padding: 40, backgroundColor: 'white' }}>
        This is the messagebox
        <button onClick={ onClick }>Send</button>
      </div>
    )
  }
}

export default MessageBox

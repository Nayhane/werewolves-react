import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// const buttonStyle = {
//   padding: 12,
//   margin: 12,
//   maxWidth: 45,
//   height: 45,
//   flex: 1,
//   textAlign: 'center',
//   cursor: 'pointer'
// }

class PlayerMenuButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
  }

  displayIcon = () => {
    switch(this.props.icon) {
      case 'message' :
        return 'Send message'
  
      case 'mayor' :
        return 'Mayor'
  
      case 'dead' :
        return 'Die!'
  
      default :
        return 'exclamation-circle'
    }
  }

  render() {
    const { onClick } = this.props
      
    return (
      <button>{ this.displayIcon() }</button>
    )
  }
}

export default PlayerDialog

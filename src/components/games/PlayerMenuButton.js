import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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
      <button onClick={ onClick }>{ this.displayIcon() }</button>
    )
  }
}

export default PlayerMenuButton

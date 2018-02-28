import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

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

      case 'Wakkerdam' :
        return 'Move to Sluimervoort'

      case 'Sluimervoort' :
        return 'Move to Wakkerdam'

      default :
        return 'exclamation-circle'
    }
  }

  render() {
    const { onClick } = this.props

    return (
      <RaisedButton onClick={ onClick }
        label={this.displayIcon()}
      />

    )
  }
}

export default PlayerMenuButton

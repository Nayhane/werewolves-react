import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'

import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import KeyIcon from 'material-ui/svg-icons/communication/vpn-key'
import SwapIcon from 'material-ui/svg-icons/communication/swap-calls'
import EnvelopeIcon from 'material-ui/svg-icons/content/mail'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import SadIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied'

class PlayerMenuButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
  }

  disabledButton = () => {
    switch(this.props.disabled) {
      case true :
        return true

      default :
        return false
    }
  }

  displayIcon = () => {
    switch(this.props.icon) {
      case 'message' :
        return ['Send message', <EnvelopeIcon />]

      case 'mayor' :
        return ['Mayor', <KeyIcon />]

      case 'dead' :
        return ['Die!', <SadIcon />]

      case 'Wakkerdam' :
        return ['Move to Sluimervoort', <SwapIcon />]

      case 'Sluimervoort' :
        return ['Move to Wakkerdam', <SwapIcon />]

      case 'DeletePlayer':
        return ['Delete player', <DeleteIcon />]

      default :
        return ['exclamation-circle', <IconLocationOn />]
    }
  }

  render() {
    const { onClick } = this.props
    const buttonStyle = {
      margin: 1,
      // width: '15px'
    }

    return (
      <IconButton
        onClick={ onClick }
        labelPosition="before"
        primary={true}
        style={buttonStyle}
        disabled={this.disabledButton()}
        tooltip={this.displayIcon()[0]}
      >
        {this.displayIcon()[1]}
      </IconButton>
    )
  }
}

export default PlayerMenuButton

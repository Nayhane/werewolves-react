import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import KeyIcon from 'material-ui/svg-icons/communication/vpn-key'
import SwapIcon from 'material-ui/svg-icons/communication/swap-calls'
import EnvelopeIcon from 'material-ui/svg-icons/content/mail'
import SadIcon from 'material-ui/svg-icons/social/sentiment-very-dissatisfied'

class PlayerMenuButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired
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

      default :
        return ['exclamation-circle', <IconLocationOn />]
    }
  }

  render() {
    const { onClick } = this.props
    const buttonStyle = {
      margin: 1,

    }

    return (
      <RaisedButton
        onClick={ onClick }
        label={this.displayIcon()[0]}
        labelPosition="before"
        primary={false}
        icon={this.displayIcon()[1]}
        style={buttonStyle}
      />
    )
  }
}

export default PlayerMenuButton

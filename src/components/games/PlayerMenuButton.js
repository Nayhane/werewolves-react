import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'

import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import CakeIcon from 'material-ui/svg-icons/social/cake'
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
        return ['Mayor', <CakeIcon />]

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

    return (
      <RaisedButton
        onClick={ onClick }
        label={this.displayIcon()[0]}
        labelPosition="before"
        primary={true}
        icon={this.displayIcon()[1]}
      />
    )
  }
}

export default PlayerMenuButton

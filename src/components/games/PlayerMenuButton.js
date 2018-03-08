import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'

import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import SwapIcon from 'material-ui/svg-icons/communication/swap-calls'
import EnvelopeIcon from 'material-ui/svg-icons/content/mail'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import ByeIcon from 'material-ui/svg-icons/content/clear'
import MayorGrey from '../../images/mayor-grey.svg'
import MayorBlue from '../../images/mayor-blue.svg'
import MayorColor from '../../images/mayor-medal.png'

import './PlayerMenuButton.css'

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

      case 'isMayor' :
        return ['Unmake Mayor', <img src={ MayorBlue } className="mayorColor" alt="MayorGrey" />]

      case 'notMayor' :
        return ['make Mayor', <img src={ MayorGrey } className="mayorColor" alt="MayorGrey" />]

      case 'makeMayor' :
        return ['Make Mayor', <img src={ MayorBlue} className="mayorGrey" alt="MayorMedal" /> ]

      case 'dead' :
        return ['Die!', <ByeIcon />]

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
      // width: '15px',
      color: 'rgb(7, 10, 51)',
    }

    return (
      <IconButton
        onClick={ onClick }
        iconStyle={buttonStyle}
        disabled={this.disabledButton()}
        tooltip={this.displayIcon()[0]}
      >
        {this.displayIcon()[1]}
      </IconButton>
    )
  }
}

export default PlayerMenuButton

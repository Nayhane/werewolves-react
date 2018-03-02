import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//components
import PlayerMenuButton from './PlayerMenuButton'
import updateDeath from '../../actions/games/updateDeath'
import updateMayor from '../../actions/games/updateMayor'
import updateSender from '../../actions/games/updateSender'
import updateVillage from '../../actions/games/updateVillage'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'


class PlayerDialog extends PureComponent {

  killPlayer = (player) => {
    const updatedPlayer = {
      dead: !player.dead,
      mayor: false
    }

    this.props.updateDeath(player._id, updatedPlayer)
  }



  makeMayor = (player) => {
    const updatedPlayer = {
      mayor: !player.mayor
    }

    this.props.updateMayor(player._id, updatedPlayer)
  }

  sendMessage = (player) => {
    let message = player.messageSent
    if (message !== 'sent') {
      message = 'sending'
    } else {
      return
    }
    const updatedPlayer = {
      messageSent: message
    }

    this.props.updateSender(player._id, updatedPlayer)
  }

  moveVillage = (player) => {
    const village = player.village[0].name
    let newVillage = ""

    if (village === 'Wakkerdam') {
      newVillage = 'Sluimervoort'
    } else {
      newVillage = 'Wakkerdam'
    }

    const updatedVillage = {
      name: newVillage
    }

    this.props.updateVillage(player._id, updatedVillage)
  }

  render() {
    const message = 'message'
    const mayor = 'mayor'
    const dead = 'dead'
    const village = this.props.player.village[0].name

    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText={<PlayerMenuButton icon={message} onClick={() => this.sendMessage(this.props.player)}/>} />
          <MenuItem primaryText={<PlayerMenuButton icon={mayor} onClick={() => this.makeMayor(this.props.player)}/>} />
          <MenuItem primaryText={<PlayerMenuButton icon={dead} onClick={() => this.killPlayer(this.props.player)}/>} />
          <MenuItem primaryText={<PlayerMenuButton icon={village} onClick={() => this.moveVillage(this.props.player)}/>} />
        </IconMenu>
      </div>
    )
  }
}

export default connect(null, {
  updateDeath,
  updateMayor,
  updateSender,
  updateVillage,
})(PlayerDialog)

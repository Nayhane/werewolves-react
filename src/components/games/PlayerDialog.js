import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//components
import PlayerMenuButton from './PlayerMenuButton'
import updateDeath from '../../actions/games/updateDeath'
import updateMayor from '../../actions/games/updateMayor'
import updateMessage from '../../actions/games/updateMessage'
import updateVillage from '../../actions/games/updateVillage'

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
    const updatedPlayer = {
      messageSent: 'sending'
    }

    this.props.updateMessage(player._id, updatedPlayer)
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
        <PlayerMenuButton icon={message} onClick={() => this.sendMessage(this.props.player)}/>
        <PlayerMenuButton icon={mayor} onClick={() => this.makeMayor(this.props.player)}/>
        <PlayerMenuButton icon={dead} onClick={() => this.killPlayer(this.props.player)}/>
        <PlayerMenuButton icon={village} onClick={() => this.moveVillage(this.props.player)}/>
      </div>
    )
  }
}

export default connect(null, {
  updateDeath,
  updateMayor,
  updateMessage,
  updateVillage,
})(PlayerDialog)

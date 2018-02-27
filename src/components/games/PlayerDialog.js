import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//components
import PlayerMenuButton from './PlayerMenuButton'
import updatePlayer from '../../actions/games/update'

class PlayerDialog extends PureComponent {

  updateDeath = (player) => {
    const updatedPlayer = {
      dead: !player.dead
    }

    this.props.updatePlayer(player._id, updatedPlayer)
  }

  updateMayor = (player) => {
    const updatedPlayer = {
      dead: !player.mayor
    }

    this.props.updatePlayer(player._id, updatedPlayer)
  }

  sendMessage = (player) => {
    const updatedPlayer = {
      message: true
    }

    this.props.updatePlayer(player._id, updatedPlayer)
  }

  render() {
    const message = 'message'
    const mayor = 'mayor'
    const dead = 'dead'

    return (
      <div>
        <PlayerMenuButton icon={message} onClick={() => this.sendMessage(this.props.player)}/>
        <PlayerMenuButton icon={mayor} onClick={() => this.updateMayor(this.props.player)}/>
        <PlayerMenuButton icon={dead} onClick={() => this.updateDeath(this.props.player)}/>
      </div>
    )
  }
}

export default connect(null, { updatePlayer })(PlayerDialog)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlayerDialog from '../components/games/PlayerDialog'

import { fetchPlayers} from '../actions/games/fetch'
import Avatar from './Avatar'



class Village extends PureComponent {
  static propTypes = {
    //fetchOneGame: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    //subscribeToWebsocket: PropTypes.func.isRequired,
    player: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.object.isRequired,
      mayor: PropTypes.bool,
      dead: PropTypes.bool,
      message: PropTypes.bool,
    }),
    // currentPlayer: playerShape,
    // isPlayer: PropTypes.bool,
    // isJoinable: PropTypes.bool,
  }



  renderVillage(player, index) {
    return(
      <div key={index}>
        <div>{ player.name }</div>
        <div>{ player.mayor ? 'Mayor' : '' }</div>
        <div>{ player.dead ? 'Dead' : '' }</div>
        <div><img src={ player.photo } /></div>
        <PlayerDialog />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>{ this.props.players.map(this.renderVillage) }</div>
        <Avatar/>

      </div>
    )
  }
}

export default Village

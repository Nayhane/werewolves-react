import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
import PlayerDialog from '../components/games/PlayerDialog'
import MoveAllToVillage from '../components/games/MoveAllToVillage'


// import { fetchPlayers} from '../actions/games/fetch'

class Village extends PureComponent {
  static propTypes = {
    fetchPlayers: PropTypes.func,
    //subscribeToWebsocket: PropTypes.func.isRequired,
    player: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.object.isRequired,
      mayor: PropTypes.bool,
      dead: PropTypes.bool,
      message: PropTypes.bool,
    }),
  }

  renderPlayer(player, index) {
    return(
      <div key={index}>
        <div>{ player.name }</div>
        <div>{ player.mayor ? 'Mayor' : '' }</div>
        <div>{ player.dead ? 'Dead' : '' }</div>
        <div>{ player.messageSent === 'sent' ? 'Message sent' : '' }</div>
        <PlayerDialog player={player}/>
      </div>
    )
  }

  render() {
    return (
      <div>
        <MoveAllToVillage players={this.props.players}/>
        <div>{ this.props.players.map(this.renderPlayer) }</div>
      </div>
    )
  }
}

export default Village

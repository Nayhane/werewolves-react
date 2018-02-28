import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
import PlayerDialog from '../components/games/PlayerDialog'
import MoveAllPlayersButton from '../components/games/MoveAllPlayersButton'

// import { fetchPlayers} from '../actions/games/fetch'
import AvatarPlayer from './AvatarPlayer'



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
        <div>{ player.message ? 'Message sent' : '' }</div>
        <PlayerDialog player={player}/>
      </div>
    )
  }

  render() {
    return (

      <div>
            <MoveAllPlayersButton players={this.props.players}/>
        <div>{ this.props.players.map(this.renderPlayer) }</div>
        <AvatarPlayer players={this.props.players}/>

      </div>
    )
  }
}

export default Village

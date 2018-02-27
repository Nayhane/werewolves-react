import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlayerDialog from '../components/games/PlayerDialog'

class Village extends PureComponent {
  static propTypes = {
    fetchOneGame: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
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

  componentWillMount() {
    this.fetchPlayers()
  }

  componentWillReceiveProps(nextProps) {

  }

  renderVillage(player) {
    return(
      <div>
        <div>{ player.name }</div>
        <div>{ player.mayor ? 'Mayor' : '' }</div>
        <div>{ player.dead ? 'Dead' : '' }</div>
        <PlayerDialog />
      </div>
    )
  }

  render() {
    
    return (
      <div>
        <div>{ this.props.players.map(this.renderPlayer) }</div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, players }, { match }) => {
    players
  }
}

export default connect(mapStateToProps)(Village)

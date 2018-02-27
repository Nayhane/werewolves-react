import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//components
import Village from './Village'


class Sidebar extends PureComponent {
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
    this.fetchPlayers();

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const village1 = this.props.players.filter((player) => {
      return player.village.name === 'wakkerdam'
    })

    const village2 = this.props.players.filter((player) => {
      return player.village.name === 'sluimervoort'
    })

    return (
      <div>
        <Village players={village1}/>
        <Village players={village2}/>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, players }, { match }) => {
  players
  }


export default connect(mapStateToProps)(Sidebar)

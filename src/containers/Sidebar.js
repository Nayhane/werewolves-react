import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlayers } from '../actions/games/fetch'
//components
import Village from './Village'


class Sidebar extends PureComponent {
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

  componentWillMount() {
    this.props.fetchPlayers();

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    let title1 = ""
    let title2 = ""

    const village1 = this.props.players.filter((player) => {
      return player.village[0].name === "Wakkerdam"
    })

    const village2 = this.props.players.filter((player) => {
      return player.village[0].name === "Sluimervoort"
    })

    if (village1.length > 0) {
      title1 = village1[0].village[0].name
    }

    if (village2.length > 0) {
      title2 = village2[0].village[0].name
    }

    return (
      <div>
        <Village title={title1} players={village1}/>
        <Village title={title2} players={village2}/>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, players }, { match }) => {
  return {
    players
  }
}


export default connect(mapStateToProps, { fetchPlayers })(Sidebar)

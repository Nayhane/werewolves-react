import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlayers, fetchVillages } from '../actions/games/fetch'
import { movePlayers } from '../actions/games/move'
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
    this.props.fetchVillages();
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {

    const village1 = this.props.players.filter((player) => {
      if (player.village[0].name === "Wakkerdam") {
        return player }
      })

      console.log(this.props.village)

      const village2 = this.props.players.filter((player) => {
        if (player.village[0].name === "Sluimervoort") {
          return player }
        })
        console.log(this.props.village)


        return (
          <div>
          <Village players={village1}/>
          <Village players={village2}/>
          </div>
        )
      }
    }

    const mapStateToProps = ({ currentUser, players, villages }, { match }) => {
      return {
        players, villages
      }
    }


    export default connect(mapStateToProps, { fetchPlayers,fetchVillages })(Sidebar)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlayers} from '../actions/games/fetch'
//components
import Village from './Village'


class Sidebar extends PureComponent {
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

  componentWillMount() {
    this.props.fetchPlayers();
  }


  render() {
    const village1 = this.props.players.filter((player) => {
          return player.village[0].name === "Wakkerdam"
    })

    const village2 = this.props.players.filter((player) => {
      return player.village[0].name === "Sluimervoort"
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
      return {
        players
      }
    }


    export default connect(mapStateToProps, { fetchPlayers })(Sidebar)

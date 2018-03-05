import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlayers} from '../actions/games/fetch'
//components
import Village from './Village'

// MUI
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
      messageSent: PropTypes.bool,
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
        <List style={{margin: 0, padding: 0}}>
          <h1>WAKKERDAM</h1>
          <Village players={village1} />
        </List>

        <Divider />

        <List>
          <h1>SLUIMERVOORT</h1>
          <Village players={village2} />
        </List>
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

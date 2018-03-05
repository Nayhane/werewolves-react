import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlayers} from '../actions/games/fetch'
//components
import Village from './Village'

// MUI
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
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
    const style = {
    width: 400,
    float: 'right',
    marginTop: 120,
    }

    const village1 = this.props.players.filter((player) => {
      return player.village[0].name === "Wakkerdam"
    })
    const deadPlayerCountVillage1 = village1.filter((player) => {
      return player.dead === !true
    })

    const village2 = this.props.players.filter((player) => {
      return player.village[0].name === "Sluimervoort"
    })
    const deadPlayerCountVillage2 = village2.filter((player) => {
      return player.dead === !true
    })

    return (
      <div style={style}>
        <List>
          <Subheader><h1>WAKKERDAM {deadPlayerCountVillage1.length}/{village1.length}</h1></Subheader>
          <Village players={village1} />

        </List>

        <Divider />

        <List>
          <Subheader><h1>SLUIMERVOORT {deadPlayerCountVillage2.length}/{village2.length}</h1></Subheader>
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

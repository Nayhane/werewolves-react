import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
//components
import Sidebar from './Sidebar'
import Timer from '../components/games/Timer'
import VillageAvatar from './VillageAvatar'
import MessageBox from '../components/games/MessageBox'

import Paper from 'material-ui/Paper'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
  }


  renderMessageBox = (player, index) => {
    if (player.messageSent === 'sending') {
      return(
        <MessageBox key={index} players={ this.props.players } player = {player}/>
      )
    }
  }

  render() {
    return (
      <div className="lobby">
        <Paper className="paper">
          <Sidebar className="sidebar"/>
          <Timer />
          { this.props.players.map(this.renderMessageBox) }
          <VillageAvatar players={this.props.players}/>
        </Paper>
      </div>

    )
  }
}

const mapStateToProps = ({  currentUser, players }) => {
  return {
    currentUser,
    players
  }
}

export default connect(mapStateToProps, {
  push,
})(Lobby)

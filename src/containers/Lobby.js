// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
//components
import Sidebar from './Sidebar'
import Timer from '../components/games/Timer'
import AvatarPlayer from './AvatarPlayer'
import MessageBox from '../components/games/MessageBox'

import Paper from 'material-ui/Paper'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.subscribeToWebsocket()
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
          <AvatarPlayer players={this.props.players}/>
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
  subscribeToWebsocket,
  push,
})(Lobby)

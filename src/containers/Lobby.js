// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
//components
import Sidebar from './Sidebar'
import Timer from '../components/games/Timer'
import AnotherTimerAgain from '../components/games/AnotherTimerAgain'
import AvatarPlayer from './AvatarPlayer'
import MessageBox from '../components/games/MessageBox'

import Paper from 'material-ui/Paper'
import './Lobby.css'

import RegisterPlayer from '../components/RegisterPlayer'

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
      <div className="Lobby">
        <RegisterPlayer />
        <AnotherTimerAgain />
        <Timer />
        { this.props.players.map(this.renderMessageBox) }
        <AvatarPlayer players={this.props.players}/>
        <Paper className="paper">
          <Sidebar/>
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

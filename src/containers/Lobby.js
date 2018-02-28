// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { connect as subscribeToWebsocket } from '../actions/websocket'
import Sidebar from './Sidebar'
import Timer from '../components/games/Timer'
import AnotherTimerAgain from '../components/games/AnotherTimerAgain'

import Paper from 'material-ui/Paper'
import './Lobby.css'

import RegisterPlayer from '../components/RegisterPlayer'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.subscribeToWebsocket()
  }

  render() {
    return (
      <div className="Lobby">
        <RegisterPlayer />
        <AnotherTimerAgain />
        <Timer />
        <Paper className="paper">
          <Sidebar/>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({  currentUser }) => ({  currentUser })

export default connect(mapStateToProps, {  subscribeToWebsocket, push })(Lobby)

// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
//import { fetchPlayers } from '../actions/games/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Sidebar from './Sidebar'
import Timer from '../components/games/Timer'
import Paper from 'material-ui/Paper'
import './Lobby.css'

import RegisterPlayer from '../components/RegisterPlayer'

class Lobby extends PureComponent {
  componentWillMount() {
    //this.props.fetchPlayers();
    this.props.subscribeToWebsocket()
  }


  render() {
    return (
      <div className="Lobby">
        <RegisterPlayer />
        <Paper className="paper">
        <Timer />
        <Sidebar/>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({  currentUser }) => ({  currentUser })

export default connect(mapStateToProps, {  subscribeToWebsocket, /*fetchPlayers,*/ push })(Lobby)

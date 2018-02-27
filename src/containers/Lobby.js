// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import  fetchPlayers  from '../actions/games/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.fetchPlayers();
    this.props.subscribeToWebsocket()
  }


  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <Paper className="paper">
          <Menu>
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({  currentUser }) => ({  currentUser })

export default connect(mapStateToProps, {  subscribeToWebsocket, push })(Lobby)

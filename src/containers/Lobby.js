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

  renderMergePopUp() {
    return(
      <div></div>
    )
  }

  renderMayorPopUp(players) {
    const deadMayor = players.filter((player) => {
      return (player.dead === true && player.mayor && true)
    })

    if (deadMayor.length > 0) {
      return(
        <div></div>
      )
    }
    return
  }

  render() {
    const deadPlayers = this.props.players.filter((player) => {
      return player.dead === true
    })

    return (
      <div className="lobby">
        <Paper className="paper">
          <Sidebar className="sidebar"/>
          { deadPlayers.length === this.props.players.length ? this.renderMergePopUp() : '' }
          { this.renderMayorPopUp(this.props.players) }
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

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
      <div>Do you want to merge the villages?</div>
    )
  }

  renderMayorPopUp(players) {
    const village1 = players.filter((player) => {
      return (player.village[0].name === 'Wakkerdam')
    })

    const village2 = players.filter((player) => {
      return (player.village[0].name === 'Sluimervoort')
    })

    const noMayor1 = village1.filter((player) => {
      return (player.mayor === true)
    })

    const noMayor2 = village2.filter((player) => {
      return (player.mayor === true)
    })

    if (noMayor1.length === 0) {
      return(
        <div>Wakkerdam needs to choose a new mayor!</div>
      )
    }

    if (noMayor2.length === 0) {
      return(
        <div>Sluimervoort needs to choose a new mayor!</div>
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
          { deadPlayers.length === (this.props.players.length/2) ? this.renderMergePopUp() : '' }
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

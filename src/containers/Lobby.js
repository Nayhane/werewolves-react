import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
//components
import Sidebar from './Sidebar'
import Timer from '../components/games/Timer'
import VillageAvatar from './VillageAvatar'
import MessageBox from '../components/games/MessageBox'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import './Lobby.css'

class Lobby extends PureComponent {
  state = {
    open: false,
  }

  componentWillMount() {
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  renderMessageBox = (player, index) => {
    if (player.messageSent === 'sending') {
      return(
        <MessageBox key={index} players={ this.props.players } player = {player}/>
      )
    }
  }

  renderMergePopUp() {
    console.log(this.state.open)

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ]

    return(
      <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >50% of the players died. You can now merge the villages!
        </Dialog>
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
      //this.handleOpen()
      return(
        <div>Wakkerdam needs to choose a new mayor!</div>
      )
    }

    if (noMayor2.length === 0) {
      //this.handleOpen()
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

    // if (deadPlayers.length === (this.props.players.length/2)) {
    //   this.handleOpen()
    // }

    return (
      <div className="lobby">
        <Paper className="paper">
          <Sidebar className="sidebar"/>

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

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchPlayers} from '../actions/games/fetch'

//components
import Sidebar from './Sidebar'
import Timer from '../components/games/Timer'
import VillageAvatar from './VillageAvatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import './Lobby.css'

class Lobby extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      mergeOpen: false,
      hasBeenOpened: false
    }
  }

  componentWillMount() {
    this.props.fetchPlayers()
  }

  componentWillUpdate() {
    const deadPlayers = this.props.players.filter((player) => {
      return player.dead === true
    })

    if (deadPlayers.length > 0 && deadPlayers.length === (this.props.players.length/2) && !this.state.hasBeenOpened) {
      this.setState({mergeOpen: true});
    }
    if (deadPlayers.length > 0 && deadPlayers.length < (this.props.players.length/2)) {
      this.setState({hasBeenOpened: false});
    }
  }

  handleMergeClose = () => {
    this.setState({hasBeenOpened: true});
    this.setState({mergeOpen: false});
  }

  renderMergePopUp() {

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleMergeClose}
      />,
    ]

    return(
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.mergeOpen}
        onRequestClose={this.handleMergeClose}
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
    return (
      <div className="lobby">
        <div className="village-container">
          <VillageAvatar players={this.props.players}/>
          <div className="timer">
            <Timer />
          </div>
        </div>
        <div className="sidebar">
          <Sidebar />
          { this.renderMergePopUp(this.state.mergeOpen) }
          { this.renderMayorPopUp(this.props.players) }
        </div>
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
  fetchPlayers
})(Lobby)

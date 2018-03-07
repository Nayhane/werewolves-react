import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import _ from 'underscore'
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
      hasBeenOpened: false,
      mayorOpen: ''
    }
  }

  componentWillMount() {
    this.props.fetchPlayers()
  }

  componentWillReceiveProps(nextProps) {
    
    //dead players

    //dead players

    const deadPlayersPrev = this.props.players.filter((player) => {
      return player.dead === true
    })

    const deadPlayersNext = nextProps.players.filter((player) => {
      return player.dead === true
    })

    if (deadPlayersPrev.length !== deadPlayersNext.length) {

      if (deadPlayersNext.length > 0 && deadPlayersPrev.length > 0 && deadPlayersNext.length === (nextProps.players.length/2)) {
        this.setState({mergeOpen: true})
      } else {
        this.setState({mergeOpen: false})
      }
    }

    //mayor players

    const mayorsPrev = this.props.players.filter((player) => {
      return player.mayor === true
    })

    const mayorsNext = nextProps.players.filter((player) => {
      return player.mayor === true
    })

    const prevIds = _.pluck(mayorsPrev, '_id')

    const newMayor = mayorsNext.filter((mayor) => {

      if (mayorsPrev.length === 0) {
        return mayor
      }
      if (prevIds.indexOf(mayor._id) === -1) {
       return mayor
      }
      return null
    })

    if (mayorsPrev.length === 1 && newMayor.length > 0 && this.props.players.length > 0) {
      this.setState({mayorOpen: newMayor[0]._id})
    }

    else if (mayorsPrev.length === 0 && newMayor.length === 1) {
      this.setState({mayorOpen: newMayor[0]._id})
    }
  }

  handleMayorClose = () => {
    this.setState({mayorOpen: false});
  }

  handleMergeClose = () => {
    this.setState({hasBeenOpened: true});
    this.setState({mergeOpen: false});
  }
  
  renderMayorPopUp = (player, index, state) => {
    let open = false
    if (state === player._id) {
      open = true
    }

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleMayorClose}
      />,
    ]
    
    return(
      <Dialog
        key={index}
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.handleMayorClose}
      >{ player.village[0].name } now has a new mayor: { player.name }!
      </Dialog>
    )
  }

  renderMayorPopUp = (player, index, state) => {
    let open = false
    if (state === player._id) {
      open = true
    }

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleMayorClose}
        />,
      ]

      return(
        <Dialog
        key={index}
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.handleMayorClose}
        >{ player.village[0].name } now has a new mayor: { player.name }!
        </Dialog>
      )
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

  render() {
    return (
      <div className="lobby">
        <div className="village-container">
          { this.props.players.map((player, index) => this.state.mayorOpen === player._id ? this.renderMayorPopUp(player, index, this.state.mayorOpen) : '')}
          <VillageAvatar players={this.props.players}/>
          <div className="timer">
            <Timer />
          </div>
        </div>
        <div className="sidebar">
          <Sidebar />
          { this.renderMergePopUp(this.state.mergeOpen) }
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

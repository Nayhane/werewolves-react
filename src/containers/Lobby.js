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


const customContentStyle = {
  width: '50%',
  height: '45vh',
  maxWidth: 'none',
  maxHeight: 'none'
};

class Lobby extends PureComponent {


  constructor(props) {
    super(props)

    this.state = {
      mergeOpen: false,
      hasBeenOpened: false,
    }
  }

  componentWillMount() {
    this.props.fetchPlayers()
  }

  componentWillReceiveProps(nextProps) {

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
  }

  handleMergeClose = () => {
    this.setState({hasBeenOpened: true});
    this.setState({mergeOpen: false});
  }

  renderMergePopUp() {

    const actions = [
      <FlatButton
        label="Continue"
        secondary={false}
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
        contentStyle={customContentStyle}
        >
        <p style={{fontSize: '25px', marginLeft:'7%', marginTop: '3%'}}>
          50% of the players died. You can now merge the villages!
        </p>
      </Dialog>
    )
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

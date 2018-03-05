import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import RegisterPlayer from '../RegisterPlayer'
import deletePlayer from '../../actions/games/delete'
import signOut from '../../actions/user/sign-out'

const TITLE = 'HEEN EN WEER WOLVEN'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      gamePage: true
    }
  }

  signOut = (event) => {
    event.preventDefault()
    this.props.signOut()
  }

  signUp = () => {
    this.props.push('/sign-up')
  }

  goHome = () => {
    this.setState({
      gamePage: true
    })
    this.props.push('/')
  }

  goToMessage = () => {
    this.setState({
      gamePage: false
    })

    this.props.push('/readmessage')
  }

  deleteAllPlayers = (players) =>  {
    for (let i = 0; i < players.length; i++) {
      this.props.deletePlayer(players[i]._id)
    }
  }


  render() {
    const { signedIn } = this.props
    const divStyle = {
      display: 'flex'
    }

    return (
      <AppBar
        title={TITLE}
        iconElementRight={signedIn ?
          <div style={divStyle}>
            <FlatButton style={{ color: 'white', marginTop: 5 }} label='Remove all players' onClick={ () => this.deleteAllPlayers(this.props.players) }/>
            <FlatButton style={{ color: 'white', marginTop: 5 }} label='Reset game' />
            { this.state.gamePage ? <FlatButton primary={true} style={{ color: 'white', marginTop: 5 }} label="Read message" onClick={this.goToMessage} /> :
            <FlatButton primary={true} style={{ color: 'white', marginTop: 5 }} label="Back to game" onClick={this.goHome} />}
            <RegisterPlayer />
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              <MenuItem primaryText="Sign out" label="Sign out" onClick={this.signOut.bind(this)} />
            </IconMenu>
          </div> :
          <FlatButton label="Sign up" onClick={this.signUp} />
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser, players }) => (
  {
    signedIn: (!!currentUser && !!currentUser._id),
    players
  })

export default connect(mapStateToProps, {
  push,
  signOut,
  deletePlayer
})(Navigation)

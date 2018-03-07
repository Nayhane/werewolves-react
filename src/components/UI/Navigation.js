import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import _ from 'underscore'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import RegisterPlayer from '../RegisterPlayer'
import deletePlayer from '../../actions/games/delete'
import resetPlayer from '../../actions/games/reset'
import signOut from '../../actions/user/sign-out'

const TITLE = 'HEEN EN WEERWOLVEN'

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

  resetGame = (players) => {

    const wakkerdam = _.sample(players, Math.round(players.length/2))
    const sluimervoort = _.difference(players, wakkerdam)

    for (let i = 0; i < wakkerdam.length; i++) {
      const newVillage = {
        name: 'Wakkerdam'
      }
      this.props.resetPlayer(wakkerdam[i]._id, newVillage)
    }

    for (let i = 0; i < sluimervoort.length; i++) {
      const newVillage = {
        name: 'Sluimervoort'
      }
      this.props.resetPlayer(sluimervoort[i]._id, newVillage)
    }
  }

  render() {
    const { signedIn } = this.props
    const divStyle = {
      display: 'flex'
    }

    return (
      <AppBar
        showMenuIconButton={false}
        title={TITLE}
        style={{ textAlign: 'left' }}
        titleStyle={{ fontSize: '3rem', marginLeft: '50px', marginTop: '0.5rem', marginBottom: '0.5rem' }}
        iconElementRight={signedIn ?
          <div style={divStyle}>
            { this.state.gamePage ? <FlatButton primary={false} style={{ marginTop: 5 }} labelStyle={{ fontSize: '1.25rem' }} label="Read message" onClick={this.goToMessage} /> :
            <FlatButton primary={true} style={{ color: 'white', marginTop: 5 }} labelStyle={{ fontSize: '1.25rem' }} label="Back to game" onClick={this.goHome} />}
            <RegisterPlayer />
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
              <MenuItem primaryText='Remove all players' onClick={ () => this.deleteAllPlayers(this.props.players) }/>
              <MenuItem primaryText='Reset game' onClick={ () => this.resetGame(this.props.players)}/>
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
  deletePlayer,
  resetPlayer,
})(Navigation)

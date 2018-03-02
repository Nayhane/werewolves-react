// src/components/ui/Navigation.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import GameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import FlatButton from 'material-ui/FlatButton'

import RegisterPlayer from '../RegisterPlayer'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'


const TITLE = 'Werewolves game'

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

  render() {
    const { signedIn } = this.props
    const divStyle = {
      display: 'flex'
    }

    return (
      <AppBar
        title={TITLE}
        iconElementLeft={
          <IconButton onClick={this.goHome}><GameIcon /></IconButton>}
        iconElementRight={signedIn ?
          <div style={divStyle}>
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

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, signOut })(Navigation)

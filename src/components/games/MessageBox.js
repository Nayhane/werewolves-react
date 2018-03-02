import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'underscore'
//components
import updateSender from '../../actions/games/updateSender'
import updateRecipient from '../../actions/games/updateRecipient'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

let setSender = ''
let recipientIndex = null

class MessageBox extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      open: false,
    }
  }

  handleTextInput = (event) => {
    this.setState({
      message: event.target.value,
    })
  }

  handlePopoverClick = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  displayRecipient() {

    // if (this.refs.recipient.value) {
    //   return this.refs.recipient.value
    // }
    return ''
  }

  sendAnonymous = () => {
    setSender = 'anonymous'
    return setSender
  }

  signMessage = () => {
    setSender = this.props.player.name
    return setSender
  }

  sendMessage = (player) => {
    const recipientId = this.menu.value

    const updatedPlayer = {
      messageSent: 'sent'
    }

    const updatedRecipient = {
      message: this.state.message,
      senderName: setSender
    }

    this.props.updateSender(player._id, updatedPlayer)
    this.props.updateRecipient(recipientId, updatedRecipient)
  }

  render() {
    const { players } = this.props
    const textInputStyle = {
      backgroundColor: 'rgba(96, 150, 255, 0.37)',
      borderRadius: '2px'
    }

    return (
      <div style={{ padding: 20, backgroundColor: 'rgb(237, 241, 255)' }}>
        <form>
          <h1>To: { this.displayRecipient() }</h1>

          <TextField
            id="text-field-controlled"
            value={this.state.message}
            onChange={this.handleTextInput}
            maxLength={160}
            ref="message"
            placeholder="Be quick - you only have 10 seconds!"
            multiLine={true}
            rows={5}
            style={textInputStyle}
          />

          <div>
            <RaisedButton
                onClick={this.handlePopoverClick}
                label="Choose recipient"
              />

              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
              >
                <Menu ref={(input) => this.menu = input}>
                  { players.map((player, index) => {
                      return(
                        <MenuItem key={index} primaryText={player.name} value={player._id} key={index} />
                      )
                    })
                  }
                </Menu>
              </Popover>

            <select ref={(input) => this.menu = input}>
              { players.map((player, index) => {
                  return(
                    <option key={index} value={player._id}>{ player.name }</option>
                  )
                })
              }
            </select>

            <input type="button" value="Send anonymous" onClick={this.sendAnonymous}/>
            <input type="button" value="Sign message" onClick={this.signMessage}/>
            <input type="button" value="Send" onClick={() => this.sendMessage(this.props.player)}/>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, {
  updateSender,
  updateRecipient
})(MessageBox)

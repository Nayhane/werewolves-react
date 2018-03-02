import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//components
import updateSender from '../../actions/games/updateSender'
import updateRecipient from '../../actions/games/updateRecipient'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

let setSender = ''

class MessageBox extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      open: false,
      recipientName: '...'
    }
  }

  handleTextInput = (event) => {
    this.setState({
      message: event.target.value,
    })
  }

  handlePopoverClick = (event) => {
    event.preventDefault()
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

  chooseRecipient = (recipient) => {
    this.setState({
      recipientId: recipient._id,
      recipientName: recipient.name
    })
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
    const recipientId = this.state.recipientId

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
          <h1>Send a message to { this.state.recipientName }</h1>

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
            disabled={true}
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
                        <MenuItem key={index} primaryText={player.name} value={player._id} onClick={() => this.chooseRecipient(player)} />
                      )
                    })
                  }
                </Menu>
              </Popover>

            <input type="button" value="Send anonymous" onClick={this.sendAnonymous}/>
            <input type="button" value="Sign message" onClick={this.signMessage}/>

          <RaisedButton
            type="button"
            value="Send"
            label="Send signed"
            onClick={() => this.sendMessage(this.props.player)} />
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

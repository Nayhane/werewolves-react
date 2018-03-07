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

const styleButton = {
  margin: 12,
}

class MessageBox extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      open: false,
      recipientName: '...',
      counter: 1000
    }
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
      clearInterval(this.timerId)
    }

  tick() {
    if (!this.state.counter <= 0) {
      this.setState({
        counter: this.state.counter - 1
      })
    } else {
      return
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
      recipientName: recipient.name,
      counter: 10
    })
  }

  sendMessage = (player, choice) => {
    const sender = choice
    const recipientId = this.state.recipientId

    const updatedPlayer = {
      messageSent: 'sent'
    }
    const updatedRecipient = {
      message: this.state.message,
      senderName: sender
    }
    this.props.updateSender(player._id, updatedPlayer)
    this.props.updateRecipient(recipientId, updatedRecipient)
  }

  render() {
    const { players } = this.props
    const textInputStyle = {
      borderRadius: '2px',
      backgroundColor: '#EFEFEF',
      color: '#1F243D'
    }

    let timerDone = false
    if (this.state.counter <= 0) {
      timerDone = true
      this.sendMessage(this.props.player, this.props.player.name)
    }

    if (this.state.recipientName !== '...') {
      return(
        <div style={{textAlign: 'center'}}>
          <h1>Send a message to { this.state.recipientName }</h1>
          <h2>You only have {this.state.counter} seconds left...</h2>

          <div>
            <TextField
              id="text-field-controlled"
              value={this.state.message}
              onChange={this.handleTextInput}
              maxLength={160}
              ref="message"
              placeholder="Quickly, send your message!"
              multiLine={true}
              rows={5}
              style={textInputStyle}
              textareaStyle={{ color: '#1F243D', padding: 10 }}
              underlineShow={false}
              disabled={timerDone}
            />
          </div>
          <br/>
          <div style={{marginLeft: '0.3rem', textAlign: 'center'}}>
            <RaisedButton
              type="button"
              value="send anonymously"
              label="send anonymously"
              primary={true}
              onClick={() => this.sendMessage(this.props.player, 'anonymous')}
              style={styleButton}
            />

            <RaisedButton
              type="button"
              value="Send"
              label="Send signed"
              primary={true}
              onClick={() => this.sendMessage(this.props.player, this.props.player.name)}
            />

          </div>
        </div>
      )
    }

    return (
      <div style={{ padding: 20, textAlign: 'center'}}>
        <h1>Choose a recipient</h1>

        <RaisedButton
          onClick={this.handlePopoverClick}
          label="Choose recipient"
          primary={true}
        />

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu ref={(input) => this.menu = input} style={{height: '15rem', overflowY: 'scroll' }}>
            { players.map((player, index) => {
                if(!player.dead){ return(
                  <MenuItem key={index} primaryText={player.name} value={player._id} onClick={() => this.chooseRecipient(player)} />
                )} else{
                  return null
                }
              })
            }
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default connect(null, {
  updateSender,
  updateRecipient
})(MessageBox)

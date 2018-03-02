import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'underscore'
//components
import updateSender from '../../actions/games/updateSender'
import updateRecipient from '../../actions/games/updateRecipient'

import TextField from 'material-ui/TextField'

let setSender = ''
let recipientIndex = null

class MessageBox extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
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
      message: this.refs.message.value,
      senderName: setSender
    }

    this.props.updateSender(player._id, updatedPlayer)
    this.props.updateRecipient(recipientId, updatedRecipient)
  }

  render() {
    const { players } = this.props
    const textInputStyle = {
      backgroundColor: 'red'
    }

    return (
      <div style={{ padding: 20, backgroundColor: 'lightgreen' }}>
        <form>
          <div>To: { this.displayRecipient() }</div>

        <TextField
          id="text-field-controlled"
          value={this.state.value}
          onChange={this.handleChange}
          maxLength={160}
          ref="message"
          placeholder="Be quick - you only have 10 seconds!"
          rows="4"
          cols="50"
          style={textInputStyle}
        />

          <div>
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

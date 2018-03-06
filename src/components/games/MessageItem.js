import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import updateMessage from '../../actions/games/updateMessage'
import './MessageItem.css'

class MessageItem extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      messageOpen: false,
      messageBorder: this.props.message.messageRead ? 'none' : '2px solid red'
    }
  }

  toggleMessage = () => {
    this.setState({
      messageOpen: !this.state.messageOpen,
      messageBorder: this.props.message.messageRead ? 'none' : '2px solid red'
    })
  }

  updateThisMessage = (playerId, messageId) => {
    this.toggleMessage()

    const newMessage = {
      messageRead: true
    }

    this.props.updateMessage(playerId, [messageId, newMessage])

  }

  render() {
    const { message } = this.props


    const inlineStyling = {
      color: 'white',
      backgroundColor: 'red',
      margin: 10,
      width: 150,
      textAlign: 'left',
      border: this.state.messageBorder
    }

    return(
      <div className="message-item">
        { this.state.messageOpen ?
          <button className="message-open" onClick={this.toggleMessage}>
            <div>From: { message.senderName }</div>
            <div>Message: { message.message }</div>
          </button>
          : <RaisedButton primary={true} style={inlineStyling} label={`To: ${message.recipient.name}`} onClick={() => this.updateThisMessage(message.recipient._id, message._id)}/>
        }
      </div>
    )
  }
}

export default connect(null, {
  updateMessage,
})(MessageItem)

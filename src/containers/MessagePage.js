import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './MessagePage.css'

class MessagePage extends PureComponent {

  renderMessage = (message, index) => {

    return(
      <div key={index} className="last-message">
        <div>From: { message[1].senderName }</div>
        <div>To: {message[0]}</div>
        <div>Message: {message[1].message}</div>
      </div>
    )
  }

  render() {
    const recipients = this.props.players.filter((player) => {
      return player.receivedMessages.length > 0
    })

    const lastMessages = recipients.map((recipient) => {
      const messages = recipient.receivedMessages
      return [recipient.name, messages[messages.length-1]]
    })

    lastMessages.sort((a, b) => {
      const keyA = a[1].createdAt
      const keyB = b[1].createdAt

      if(keyA < keyB) return 1;
      if(keyA > keyB) return -1;
      return 0
    })

    return(
      <div className="message-page">
        { lastMessages.map(this.renderMessage) }
      </div>
    )
  }

}

const mapStateToProps = ({ currentUser, players }, { match }) => {
  return {
    players
  }
}

export default connect(mapStateToProps)(MessagePage)

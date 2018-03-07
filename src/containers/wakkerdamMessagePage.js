import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import MessageItem from '../components/games/MessageItem.js'

import { fetchPlayers } from '../actions/games/fetch'

class wakkerdamMessagePage extends PureComponent {

  componentWillMount() {
    this.props.fetchPlayers()
    this.props.subscribeToWebsocket()
  }

  renderMessage = (message, index) => {
    return(
      <div key={index} style={{ marginLeft: '5.5rem'}}><MessageItem key={index} message={message}/></div>
    )
  }

  render() {
    const wakkerdamRecipients = this.props.players.filter((player)=> {
    return player.village[0].name === "Wakkerdam"
  })

    const recipients = wakkerdamRecipients.filter((player) => {
      return player.receivedMessages.length > 0
    })

    const messages = recipients.map((recipient) => {
      const allMessages = recipient.receivedMessages
      return [recipient, allMessages]
    })

    const singleMessages = messages.map((message) => {
      const singleRecipient = message[1].map((m) => {
        return {...m, recipient: message[0]}
      })

      return singleRecipient
    })

    const allMessages = [].concat.apply([], singleMessages)

    allMessages.sort((a, b) => {
      const keyA = a.createdAt
      const keyB = b.createdAt

      if(keyA < keyB) return 1;
      if(keyA > keyB) return -1;
      return 0
    })

    return(
      <div className="message-page" style={{ margin: 30 }}>
        { allMessages.map(this.renderMessage) }
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, players }) => {
  return {
    players
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchPlayers
})(wakkerdamMessagePage)

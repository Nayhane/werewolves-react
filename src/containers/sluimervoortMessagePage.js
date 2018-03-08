import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import MessageItem from '../components/games/MessageItem.js'

import { fetchPlayers } from '../actions/games/fetch'

class sluimervoortMessagePage extends PureComponent {

  componentWillMount() {
    this.props.fetchPlayers()
    this.props.subscribeToWebsocket()
  }

  renderMessage = (message, index) => {
    return(
      <div key={index} style={{ marginLeft: '24rem', marginTop: '0.1rem' }}><MessageItem key={index} message={message}/></div>
    )
  }

  render() {
    const sluimervoortRecipients = this.props.players.filter((player)=> {
      return player.village[0].name === "Sluimervoort"
    })

    const recipients = sluimervoortRecipients.filter((player) => {
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
      <div className="message-page" style={{ margin: '1.5rem' }}>
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
})(sluimervoortMessagePage)

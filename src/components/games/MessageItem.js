import React, { PureComponent } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import './MessageItem.css'

class MessageItem extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      messageOpen: false
    }
  }

  toggleMessage = () => {
    this.setState({
      messageOpen: !this.state.messageOpen
    })
  }

  render() {
    const { message } = this.props
    const inlineStyling = {
      color: 'white',
      margin: 10,
      width: 150,
      textAlign: 'left'
    }

    return(
      <div className="message-item">
        { this.state.messageOpen ?
          <button className="message-open" onClick={this.toggleMessage}>
            <div>From: { message.senderName }</div>
            <div>Message: { message.message }</div>
          </button>
          : <RaisedButton primary={true} style={inlineStyling} label={`To: ${message.recipient}`} onClick={this.toggleMessage}/>
        }
      </div>
    )
  }
}

export default MessageItem

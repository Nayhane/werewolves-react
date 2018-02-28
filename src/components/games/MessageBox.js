import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//components
import updateMessage from '../../actions/games/updateMessage'

let setSender = ''

class MessageBox extends PureComponent {

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

    const updatedPlayer = {
      messageSent: 'sent'
    }

    this.props.updateMessage(player._id, updatedPlayer)
  }

  render() {
    const { players } = this.props

    return (
      <div style={{ padding: 20, backgroundColor: 'rgb(74, 70, 65)' }}>
        <form>
          <div>To: { this.displayRecipient() }</div>
          <br/>
          <textarea placeholder="Be quick - you only have 10 seconds!" rows="4" cols="50">
          </textarea>
          <div>
            <select>
              { players.map((player, index) => {
                  return(
                    <option key={index} ref="recipient" value={player}>{ player.name }</option>
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
  updateMessage
})(MessageBox)

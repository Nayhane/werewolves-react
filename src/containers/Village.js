import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PlayerDialog from '../components/games/PlayerDialog'
import MayorMedal from '../images/mayor-medal.png'
import VillageMenuButton from '../components/games/VillageMenuButton'
import movePlayers from '../actions/games/move'

import EmailIcon from 'material-ui/svg-icons/communication/email'
import './Village.css'

const setClassName = ( mayor, receivedMessages, dead) => {
  if (mayor) {
      return 'sidebar-mayor'
  }
  if ( receivedMessages.length < 0){
    return ''
  } else if (receivedMessages.length > 0){
    return 'sidebar-mail'
  }

  if (dead) {
    return 'sidebar-dead'
  }
}

class Village extends PureComponent {
  renderPlayer(player, index) {
    let unreadMessages = player.receivedMessages.filter(function(message){
      return message.messageRead === false
    })

    return(
      <div key={index} className={setClassName(player.mayor, player.receivedMessages, player.dead)}>
        <div className='sidebar-name'>
          <div className='nameblock'>
            <p>
              {player.name}
            </p>
            <span>
              {player.mayor && player.dead === false ? <img src={MayorMedal} className="medal-sidebar" alt="MayorMedal" /> : ''}
              <span className="email-sidebar">{player.receivedMessages.length && unreadMessages.length > 0 && player.dead === false ? <EmailIcon /> : ''}</span>
            </span>
          </div>
          <div className='pop-over'>
            {<PlayerDialog player={player} {...player.messageSent} /> }
          </div>
        </div>
      </div>
    )
  }

  moveAllPlayers = (players) => {
    let updatedVillage = {}

    for ( let i=0; i < players.length; i++) {
      if (players[i].village[0].name === "Wakkerdam") {
        updatedVillage = {
          name: "Sluimervoort"
        }
      } else if (players[i].village[0].name === "Sluimervoort") {
        updatedVillage = {
          name: "Wakkerdam"
        }
      }
      this.props.movePlayers(players[i]._id, updatedVillage)
    }
  }

  render() {
    let villageName = ''
    if (this.props.players.length > 0) {
      if (this.props.players[0].village[0].name === 'Wakkerdam') {
        villageName = 'Sluimervoort'
      } else {
        villageName = 'Wakkerdam'
      }
    }

    return (
      <div>
        <VillageMenuButton label={`Move players to ${villageName}`} onClick={ () => this.moveAllPlayers(this.props.players) }/>
        <div>{ this.props.players.map(this.renderPlayer) }</div>
      </div>
    )
  }
}

export default connect(null, {
  movePlayers
 })(Village)

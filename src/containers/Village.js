import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PlayerDialog from '../components/games/PlayerDialog'
//import MoveAllToVillage from '../components/games/MoveAllToVillage'
import Email from '../images/email.png'
import MayorMedal from '../images/mayor-medal.png'
import Cross from '../images/cross.png'
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import VillageMenuButton from '../components/games/VillageMenuButton'
import movePlayers from '../actions/games/move'
import './Village.css'

import EmailIcon from 'material-ui/svg-icons/communication/email'

const setClassName = ( mayor, receivedMessages) => {

if (mayor) {
    return 'mayor'
  }
  if ( receivedMessages.length < 0){
    return ''

  } else if (receivedMessages.length > 0){
    return 'Email'
  }
}

class Village extends PureComponent {
  renderPlayer(player, index) {
     let unreadMessages = player.receivedMessages.filter(function(message){
       return message.messageRead === false
     })

     return(
      <div key={index} >
        <Card id="body" className={setClassName( player.mayor, player.receivedMessages)}>
          <CardHeader
             title={player.name}
             subtitle={ player.dead ? <img src={Cross} className="cross" alt="cross" /> : ''}
           />
          <CardHeader
             title={ player.receivedMessages.length && unreadMessages.length > 0 && player.dead === false ? <EmailIcon /> : ''}
             subtitle= { player.mayor && player.dead === false ? <img src={MayorMedal} className="medal" alt="MayorMedal" /> : ''}
             children={<PlayerDialog player={player}/> }
           />
          <CardActions>
             { player.mayor ? 'Mayor' : '' }
             { player.dead ? 'Dead' : '' }
             { player.messageSent === 'sent' ? 'Message sent' : '' }
          </CardActions>
        </Card>
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

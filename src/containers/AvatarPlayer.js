import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import MayorMedal from '../images/mayor-medal.png'
import Email from '../images/email.png'

import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import './AvatarPlayer.css'


const setClassName = (dead, mayor, receivedMessages) => {
  if (dead) {
    return 'dead'
  }
  if (mayor) {
    return 'mayor'
  } console.log(receivedMessages)
  if ( receivedMessages.length < 0){
    return ''
  } else if (receivedMessages.length > 0){
    return 'Email'
  }

}


class AvatarPlayer extends PureComponent {
  componentWillMount() {
    this.props.subscribeToWebsocket()
  }


  renderAvatars(player, index){
   return(
     <div key={index} className="avatar">
     <div className={setClassName(player.dead, player.mayor, player.receivedMessages)}>
      <List>
      <Badge badgeContent={ player.receivedMessages.length ? <img src={Email} className="Email" alt="Email" /> : ''} secondary={true} >
        <Badge
        badgeContent={ player.mayor ? <img src={MayorMedal} className="medal" alt="MayorMedal" /> : ''} secondary={true}
        >
        <ListItem
          leftAvatar={
          <Avatar src={player.photo} size={80}/>
        }>
        </ListItem>
        <br/><br/><br/>
        <div className='name'>{player.name}</div>
       </Badge>
       </Badge>
      </List>
     </div>
    </div>
   )
  }

  render() {

    return (
      <div>
          {this.props.players.map(this.renderAvatars) }
      </div>
    )
  }
}

export default connect(null, { subscribeToWebsocket})(AvatarPlayer)

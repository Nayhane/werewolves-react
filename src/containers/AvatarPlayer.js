import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import MayorMedal from '../images/mayor-medal.png'
//import Email from '../images/email.png'

import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import ListItem from 'material-ui/List/ListItem';

import './AvatarPlayer.css'

const setClassName = (dead, mayor) => {
  if (dead) {
    return 'dead'
  }
  if (mayor) {
    return 'mayor'
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
          <Badge
            badgeContent={ player.mayor ? <img src={MayorMedal}
            className="avatar-medal" alt="MayorMedal" /> : ''}
            secondary={true}
          >
          <ListItem
            disabled={true}
            leftAvatar={
            <Avatar src={player.photo} size={80}/>
            }>
          </ListItem>
          <br/><br/><br/>
          <span className='name'>{player.name}</span>
         </Badge>
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

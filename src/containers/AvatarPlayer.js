import React, { PureComponent } from 'react'
// import { fetchPlayers} from '../actions/games/fetch'
import MayorMedal from '../images/mayor-medal.png'
//material ui
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import List from 'material-ui/List/List';
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

  renderAvatars(player, index){
   return(
     <div key={index} className="avatar">
      <List>
       <Badge badgeContent={ player.mayor ? <img src={MayorMedal} className="medal" alt="MayorMedal" /> : ''} primary={false} >
        <div className={setClassName(player.dead, player.mayor)}>
          <ListItem
           leftAvatar={
            <Avatar src={player.photo}
              size={80}/>
           }>
          </ListItem>
        </div>
        <br/><br/><br/>
        <div className='name'>{player.name}</div>
       </Badge>
      </List>
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




export default AvatarPlayer

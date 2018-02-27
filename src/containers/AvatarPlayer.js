import React, { PureComponent } from 'react'
// import { fetchPlayers} from '../actions/games/fetch'
//material ui
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import './AvatarPlayer.css'



class AvatarPlayer extends PureComponent {

  renderAvatars(player, index){
   return(
     <div  key={index} className='avatar'>
     <List>
      <ListItem
       leftAvatar={
        <Avatar src={player.photo}
        size={80}
        />
       }
      >
      </ListItem>
      <br /><br /><br />
       <div className='name'>{player.name}</div>
      </List>
      </div>
   )
  }

  render() {
    return (
      <div>
        <div>{this.props.players.map(this.renderAvatars) }</div>
      </div>
    )
  }
}




export default AvatarPlayer

import React, { PureComponent } from 'react'
// import { fetchPlayers} from '../actions/games/fetch'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import MayorMedal from '../images/mayor-medal.png'
import Email from '../images/email.png'
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

  componentWillMount() {
    this.props.subscribeToWebsocket()
  }

  renderAvatars(player, index){
   return(
     <div key={index} className="avatar">
     <div className={setClassName(player.dead, player.mayor)}>
      <List>
      <Badge badgeContent={ player._id.receivedMessages ? <img src={Email} className="Email" alt="Email" /> : ''} primary={true} >
        <Badge badgeContent={ player.mayor ? <img src={MayorMedal} className="medal" alt="MayorMedal" /> : ''} primary={true} >
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

export default connect(null, {
  subscribeToWebsocket,
})(AvatarPlayer)

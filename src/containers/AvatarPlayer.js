import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import MayorMedal from '../images/mayor-medal.png'

import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';

import './AvatarPlayer.css'

const setClassName = (dead, mayor) => {
  if (dead) {
    return 'dead'
  }
  if (mayor) {
    return 'mayor'
  }
}

const avatarStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}

class AvatarPlayer extends PureComponent {
  componentWillMount() {
    this.props.subscribeToWebsocket()
  }

  renderAvatars(player, index){
   return(
    <div key={index}>
      <div className={setClassName(player.dead, player.mayor, player.receivedMessages)}>
          <Badge
            badgeContent={ player.mayor ? <img src={ MayorMedal }
            className="avatar-medal" alt="MayorMedal" /> : ''}
            secondary={true}
          >
            <div className='avatar-box'>
              <Avatar src={player.photo} size={100} />
              <div className='playerName'>{player.name}</div>
            </div>
         </Badge>
      </div>
    </div>
   )
  }

  render() {
    return (
      <div style={avatarStyle}>
          { this.props.players.map(this.renderAvatars) }
      </div>
    )
  }
}

export default connect(null, { subscribeToWebsocket})(AvatarPlayer)

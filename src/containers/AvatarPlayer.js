import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import _ from 'underscore'
import MayorMedal from '../images/mayor-medal.png'
//import Email from '../images/email.png'

import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import ListItem from 'material-ui/List/ListItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
  constructor(props) {
    super(props)

    this.state = {
      mayorOpen: ''
    }
  }
  
  componentWillMount() {
    this.props.subscribeToWebsocket()
  }
  
  componentWillReceiveProps(nextProps) {
    
    const mayorsPrev = this.props.players.filter((player) => {
      return player.mayor === true
    })
    
    const mayorsNext = nextProps.players.filter((player) => {
      return player.mayor === true
    })
    
    const newMayor = mayorsNext.filter((mayor) => { 
      if (mayorsPrev.length === 0) {
        return mayor
      }
      return mayor._id !== mayorsPrev[0]._id
    })
    
    console.log(mayorsPrev)
    console.log(mayorsNext)
    console.log(newMayor)
    
    if (newMayor.length > 0 && this.props.players.length > 0) {
      this.setState({mayorOpen: newMayor[0]._id})
    } else {
      this.setState({mayorOpen: ''})
    }
    //}
    
    // const wakkerdamArray =  this.props.players.filter((player) => {
    //    return player.village[0].name === "Wakkerdam"
    // })
    // const sluimervoortArray =  this.props.players.filter((player) => {
    //   return player.village[0].name === "Sluimervoort"
    // })
    // 
    // const wMayorArray = wakkerdamArray.filter((player) => {
    //   return player.mayor === true
    // })
    // 
    // const sMayorArray = sluimervoortArray.filter((player) => {
    //   return player.mayor === true
    // })
    // 
    // if (wMayorArray.length === 0 && player.village[0].name === "Wakkerdam" && !player.dead){
    //   this.setState({
    //     mayorOpen: true
    //   })
    //  }
    // if (sMayorArray.length === 0 && player.village[0].name === "Sluimervoort" && !player.dead){
    //   this.setState({
    //     mayorOpen: true
    //   })
    // }
  }
  
  handleMayorClose = () => {
    this.setState({mayorOpen: false});
  }
  
  renderMayorPopUp = (village, mayor, id) => {
    let open = false
    if (this.state.mayorOpen === id) {
      open = true
    }
    
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleMayorClose}
      />,
    ]

    return(
      <Dialog
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.handleMayorClose}
      >{ village } now has a new mayor: { mayor }!
      </Dialog>
    )
  }

  renderAvatars(player, index, mayorOpen, mayorPopUp){
   return(
    <div key={index} className="avatar">
      { mayorOpen === player._id ? mayorPopUp(player.village[0].name, player.name, player._id) : ''}
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
          {this.props.players.map((player, index) => this.renderAvatars(player, index, this.state.mayorOpen, this.renderMayorPopUp)) }
      </div>
    )
  }
}

export default connect(null, { subscribeToWebsocket})(AvatarPlayer)

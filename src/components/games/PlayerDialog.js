import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

//components
import PlayerMenuButton from './PlayerMenuButton'
import updateDeath from '../../actions/games/updateDeath'
import updateMayor from '../../actions/games/updateMayor'
import updateSender from '../../actions/games/updateSender'
import updateVillage from '../../actions/games/updateVillage'
import deletePlayer from '../../actions/games/delete'

import MessageBox from './MessageBox'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';


const customContentStyle = {
  width: '90%',
  maxWidth: 'none',
}

const mayorDialogStyle = {
  width: '50%',
  height: '45vh',
  maxWidth: 'none',
  maxHeight: 'none',
};


class PlayerDialog extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      //mayorOpen: false
    }
  }

  handleOpen = (player, index) => {
    this.setState({open: true})
    this.sendMessage(player, index)
  }

  handleClose = () => {
    this.setState({open: false});
  }

  // handleMayorClose = () => {
  //   this.setState({mayorOpen: false});
  // }

  killPlayer = (player) => {
    const updatedPlayer = {
      dead: !player.dead,
      mayor: false
    }

    this.props.updateDeath(player._id, updatedPlayer)
  }

  makeMayor = (player) => {
     const updatedPlayer = {
       mayor: !player.mayor
     }

     const wakkerdamArray =  this.props.players.filter((player) => {
        return player.village[0].name === "Wakkerdam"
     })
     const sluimervoortArray =  this.props.players.filter((player) => {
       return player.village[0].name === "Sluimervoort"
     })

     const wMayorArray = wakkerdamArray.filter((player) => {
       return player.mayor === true
     })

     const sMayorArray = sluimervoortArray.filter((player) => {
       return player.mayor === true
     })

     if (wMayorArray.length === 0 && player.village[0].name === "Wakkerdam"){
       this.setState({
         mayorOpen: true
       })
      }
     if (sMayorArray.length === 0 && player.village[0].name === "Sluimervoort"){
       this.setState({
         mayorOpen: true
       })
     }
     // eslint-disable-next-line
     if (wMayorArray.length > 0 && player.mayor === true || sMayorArray.length > 0 && player.mayor === true ){
       this.props.updateMayor(player._id, updatedPlayer)
     }
     if (wMayorArray.length > 0 && player.village[0].name === "Wakkerdam"){ return null}
     if (sMayorArray.length > 0 && player.village[0].name === "Sluimervoort"){ return null}
     if (sMayorArray.length > 0 && wMayorArray.length > 0 ){ return null }

      this.props.updateMayor(player._id, updatedPlayer)
   }

   deleteThisPlayer = (player) =>  {
     this.props.deletePlayer(player._id)
   }

  sendMessage = (player, index) => {
    let message = player.messageSent
    if (message !== 'sent' ) {
      return(
      <MessageBox key={index} players={ this.props.players } player = {player}/>
      )
    } else {
      return <h1>Message sent!</h1>
    }
  }

  moveVillage = (player) => {
    const village = player.village[0].name
    let newVillage = ""

    if (village === 'Wakkerdam') {
      newVillage = 'Sluimervoort'
    } else {
      newVillage = 'Wakkerdam'
    }

    const updatedVillage = {
      name: newVillage
    }

    this.props.updateVillage(player._id, updatedVillage)
  }

  // renderMayorPopUp(village, mayor) {
  //
  //   const actions = [
  //     <FlatButton
  //       label="Continue"
  //       secondary={false}
  //       keyboardFocused={true}
  //       onClick={this.handleMayorClose}
  //     />,
  //   ]
  //
  //   return(
  //     <Dialog
  //       actions={actions}
  //       modal={false}
  //       open={this.state.mayorOpen}
  //       onRequestClose={this.handleMayorClose}
  //       contentStyle={mayorDialogStyle}
  //     >
  //     <p style={{fontSize: '25px', marginLeft:'2%', marginTop: '3%'}}>
  //       { village } now has a new mayor: { mayor }!
  //     </p>
  //     </Dialog>
  //   )
  // }

  render() {
    const message = 'message'
    const mayor = 'mayor'
    const dead = 'dead'
    const DeletePlayer = 'DeletePlayer'
    const village = this.props.player.village[0].name

    const actions = [
      <RaisedButton
        label="Back to game"
        secondary={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        <PlayerMenuButton disabled={this.props.player.messageSent === 'sent' || this.props.player.dead ? true : false } icon={message} onClick={() => this.handleOpen(this.props.player)} />
        <PlayerMenuButton disabled={this.props.player.dead? true : false} icon={mayor} onClick={() => this.makeMayor(this.props.player)} />
        <PlayerMenuButton icon={dead} onClick={() => this.killPlayer(this.props.player)}/>
        <PlayerMenuButton disabled={this.props.player.dead? true : false} icon={village} onClick={() => this.moveVillage(this.props.player)}/>
        <PlayerMenuButton icon={DeletePlayer} onClick={() => this.deleteThisPlayer(this.props.player)}/>

        <Dialog
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          { this.sendMessage(this.props.player) }
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({  players }) => {
  return {
    players
  }
}

export default connect(mapStateToProps, {
  updateDeath,
  updateMayor,
  updateSender,
  updateVillage,
  deletePlayer,
})(PlayerDialog)

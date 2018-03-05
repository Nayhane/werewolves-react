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

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const customContentStyle = {
  width: '90%',
  maxWidth: 'none',
}

class PlayerDialog extends PureComponent {
  state = {
    open: false
  }

  handleOpen = (player, index) => {
    this.setState({open: true})
    this.sendMessage(player, index)
  }

  handleClose = () => {
    this.setState({open: false});
  }

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

     this.props.updateMayor(player._id, updatedPlayer)
   }

   deleteThisPlayer = (player) =>  {
     this.props.deletePlayer(player._id)
   }

  sendMessage = (player, index) => {
    let message = player.messageSent
    if (message !== 'sent') {
      return(
        <MessageBox key={index} players={ this.props.players } player = {player}/>
        )
    } else {
      return <h1>You already sent a message!</h1>
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

  render() {
    const message = 'message'
    const mayor = 'mayor'
    const dead = 'dead'
    const deletePlayer = 'delete'
    const village = this.props.player.village[0].name

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <MenuItem primaryText={<PlayerMenuButton icon={message} onClick={() => this.handleOpen(this.props.player)} />} />
        <MenuItem primaryText={<PlayerMenuButton icon={mayor} onClick={() => this.makeMayor(this.props.player)}/>} />
        <MenuItem primaryText={<PlayerMenuButton icon={dead} onClick={() => this.killPlayer(this.props.player)}/>} />
        <MenuItem primaryText={<PlayerMenuButton icon={village} onClick={() => this.moveVillage(this.props.player)}/>} />
        <MenuItem primaryText={<PlayerMenuButton icon={deletePlayer} onClick={() => this.deleteThisPlayer(this.props.player)}/>} />
        </IconMenu>

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

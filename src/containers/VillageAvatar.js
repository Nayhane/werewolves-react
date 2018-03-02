import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider';
import { fetchPlayers} from '../actions/games/fetch'
import AvatarPlayer from './AvatarPlayer'

import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';



class VillageAvatar extends PureComponent {
  componentWillMount() {
    this.props.fetchPlayers();
  }


  render() {


    const style = {
    width: 800,
    height: 800,
    float: 'left',
    display: 'inline-block'    
    }


    const village1 = this.props.players.filter((player) => {
      return player.village[0].name === "Wakkerdam"
    })

    const village2 = this.props.players.filter((player) => {
      return player.village[0].name === "Sluimervoort"
    })


    return (

      <div style={style}>
        <List>
          <Subheader><h1>WAKKERDAM</h1></Subheader>
          <AvatarPlayer players={village1} />
        </List>

        <Divider />

        <List>
          <Subheader><h1>SLUIMERVOORT</h1></Subheader>
          <AvatarPlayer players={village2} />
        </List>

      </div>
    )
  }
}


const mapStateToProps = ({ currentUser, players }, { match }) => {
  return {
    players
  }
}


export default connect(mapStateToProps, { fetchPlayers })(VillageAvatar)

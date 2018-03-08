import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlayers} from '../actions/games/fetch'
//components
import Village from './Village'

// MUI
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';

class Sidebar extends PureComponent {
  static propTypes = {
    fetchPlayers: PropTypes.func,
    player: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.object.isRequired,
      mayor: PropTypes.bool,
      dead: PropTypes.bool,
      messageSent: PropTypes.bool,
    }),
  }

  componentWillMount() {
    this.props.fetchPlayers();
  }

  render() {
    const sidebarStyle = {
      backgroundColor: '#1f243d',
      overflow: 'hidden',
      position: 'absolute',
      padding: 0,
      margin: 0,
      right: 0,
      width: '22%'
    }
    const fixedBar = {
      height: '40vh',
      overflowY: 'scroll',
      padding: 0,
      margin: 0,
    }

    const village1 = this.props.players.filter((player) => {
      return player.village[0].name === "Wakkerdam"
    })
    const deadPlayerCountVillage1 = village1.filter((player) => {
      return player.dead === !true
    })

    const village2 = this.props.players.filter((player) => {
      return player.village[0].name === "Sluimervoort"
    })
    const deadPlayerCountVillage2 = village2.filter((player) => {
      return player.dead === !true
    })

    return (
      <div style={sidebarStyle}>
        <List>
        <div style={{display:'inline-flex', justifyContent:'space-between' , backgroundColor: '#9aacb6', width: '100%'}}>
          <h1 style={{paddingTop: '1.2rem', paddingLeft:'0.6rem'}}> WAKKERDAM </h1>
          <p style={{paddingRight: '0.6rem', paddingBottom:'0.1rem'}}> {deadPlayerCountVillage1.length}/{village1.length} </p>
        </div>
        <div style={fixedBar}>
          <Village players={village1} />
        </div>
       </List>

      <Divider />

        <List>
        <div style={{display:'inline-flex', justifyContent:'space-between' , backgroundColor: '#9aacb6', width: '100%'}}>
          <h1 style={{paddingTop: '1.2rem', paddingLeft:'0.6rem'}} > SLUIMERVOORT </h1>
          <p style={{paddingRight: '0.6rem', paddingBottom:'0.1rem'}}> {deadPlayerCountVillage2.length}/{village2.length} </p>
        </div>
          <div style={fixedBar}>
            <Village players={village2} />
          </div>
        </List>
      </div>
    )
  }
}


const mapStateToProps = ({ currentUser, players }) => {
  return {
    players
  }
}

export default connect(mapStateToProps, { fetchPlayers })(Sidebar)

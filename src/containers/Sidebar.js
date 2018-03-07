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
    }
    const fixedBar = {
      height: '40vh',
      overflow: 'scroll',
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
          <h1>WAKKERDAM: {deadPlayerCountVillage1.length}/{village1.length}</h1>
          <div style={fixedBar}>
           <Village players={village1} />
          </div>
        </List>

        <Divider />

        <List>
          <h1>SLUIMERVOORT:  {deadPlayerCountVillage2.length}/{village2.length} </h1>
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

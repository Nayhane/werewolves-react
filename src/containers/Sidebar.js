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
    const temporaryStyle = {
      margin: 0,
      padding: 0,
      backgroundColor: '#1f243d'
    }

    const scoreStyle = {
      float: 'right',
      color: 'black',
      fontSize: '1rem',
      paddingRight: 30,
      paddingTop: 5,
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
      <div>
        <List style={temporaryStyle}>
          <div>
            <h1>WAKKERDAM
              <span style={scoreStyle}>
                 {deadPlayerCountVillage1.length}  / {village1.length}
              </span>
            </h1>
          </div>
          <Village players={village1} />
        </List>

        <Divider />

        <List style={temporaryStyle}>
          <div>
            <h1>SLUIMERVOORT
              <span style={scoreStyle}>
                {deadPlayerCountVillage2.length} / {village2.length}
              </span>
            </h1>
          </div>
          <Village players={village2} />
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

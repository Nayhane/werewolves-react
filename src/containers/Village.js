import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
import PlayerDialog from '../components/games/PlayerDialog'
import MoveAllToVillage from '../components/games/MoveAllToVillage'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Village extends PureComponent {
  static propTypes = {
    fetchPlayers: PropTypes.func,
    //subscribeToWebsocket: PropTypes.func.isRequired,
    player: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.object.isRequired,
      mayor: PropTypes.bool,
      dead: PropTypes.bool,
      message: PropTypes.bool,
    }),
  }

  renderPlayer(player, index) {
    return(
      <div key={index}>
        <Card>
          <CardHeader
            title={player.name}
            avatar={player.photo}
          />
          <CardActions>
            { player.mayor ? 'Mayor' : '' }
            { player.dead ? 'Dead' : '' }
            { player.message ? 'Message sent' : '' }
            <PlayerDialog player={player}/>
          </CardActions>
      </Card>

      </div>
    )
  }

  render() {
    return (
      <div>
        <MoveAllToVillage players={this.props.players}/>
        <div>{ this.props.players.map(this.renderPlayer) }</div>
      </div>
    )
  }
}

export default Village

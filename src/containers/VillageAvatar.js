import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider';
import { fetchPlayers} from '../actions/games/fetch'
import AvatarPlayer from './AvatarPlayer'
import {Card, CardHeader} from 'material-ui/Card';

class VillageAvatar extends PureComponent {
  componentWillMount() {
    this.props.fetchPlayers();
  }


  render() {

    const village1 = this.props.players.filter((player) => {
      return player.village[0].name === "Wakkerdam"
    })

    const village2 = this.props.players.filter((player) => {
      return player.village[0].name === "Sluimervoort"
    })


    return (
      <div>
      <Card>
        <CardHeader
        title="WAKKERDAM" />
        <Card>
        <AvatarPlayer players={village1} />
        </Card>
      </Card>

      <Divider />

      <Card>
        <CardHeader
        title="SLUIMERVOORT" />
        <Card>
        <AvatarPlayer players={village2}
        />
        </Card>
        </Card>
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

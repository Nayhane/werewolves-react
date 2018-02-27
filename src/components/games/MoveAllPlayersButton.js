import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import createGame from '../../actions/games/create'

class MoveAllPlayersButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }


  movePlayers = (players) =>
  players.map(player){
    if (player.village === "Wakkerdam"){
      return {village: "Sluimervoort"}
    } else (player.village === "Sluimervoort"){
      return {village: "Sluimervoort"}
    }
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateGameButton">
      <RaisedButton
      onClick={this.movePlayers}
      icon={<StarIcon />} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createGame })(MoveAllPlayersButton)

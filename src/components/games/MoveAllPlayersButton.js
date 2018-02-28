import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import movePlayers from '../../actions/games/move'

class MoveAllPlayersButton extends PureComponent {



  moveAllPlayers = (players) => {
    let updateVillage = {}
    const movedPlayers = players.forEach(function(player) {
      if (player.village[0].name === "Wakkerdam"){
        updateVillage = {
            name: "Sluimervoort"
          }
          this.props.movePlayers(player._id, updateVillage);


      } else if (player.village[0].name === "Sluimervoort"){
        updateVillage = {
            name: "Wakkerdam"
          }
          this.props.movePlayers(player._id, updateVillage)
      }
    })
  }
    render() {


      return (
        <div>
        <RaisedButton
        label="Move All PLayers"
        onClick={()=>this.moveAllPlayers(this.props.players)}
        />
        </div>
      )
    }
  }

  const mapStateToProps = () => ({

  })

  export default connect(mapStateToProps, { movePlayers })(MoveAllPlayersButton)

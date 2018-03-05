// import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'
// import VillageMenuButton from './VillageMenuButton'
// import movePlayers from '../../actions/games/move'
//
// class MoveAllToVillage extends PureComponent {
//
//   moveAllPlayers = (players) => {
//     let updatedVillage = {}
//
//     for ( let i=0; i < players.length; i++) {
//       if (players[i].village[0].name === "Wakkerdam") {
//         updatedVillage = {
//           name: "Sluimervoort"
//         }
//       } else if (players[i].village[0].name === "Sluimervoort") {
//         updatedVillage = {
//           name: "Wakkerdam"
//         }
//       }
//       this.props.movePlayers(players[i]._id, updatedVillage)
//   }
// }
//     render() {
//
//       return (
//         <div>
//           <VillageMenuButton label='Move all players' onClick={ () => this.moveAllPlayers(this.props.players) }/>
//         </div>
//       )
//     }
//   }
//
//   export default connect(null, { movePlayers })(MoveAllToVillage)

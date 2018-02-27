// src/reducers/players.js
import { FETCHED_ONE_PLAYER } from '../actions/games/fetch'
import  MOVE_PLAYERS  from '../actions/games/move'
import  FETCHED_PLAYERS  from '../actions/games/fetch'
import {
  PLAYER_CREATED,
  PLAYER_REMOVED,
  PLAYER_UPDATED,
  PLAYERS_UPDATED,
} from '../actions/games/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_PLAYERS :
    return [ ...payload ]

    case FETCHED_ONE_PLAYER :
    const playerIds = state.map(g => g._id)
    if (playerIds.indexOf(payload._id) < 0) {
      return [{ ...payload }].concat(state)
    }
    return state.map((player) => {
      if (player._id === payload._id) {
        return { ...payload }
      }
      return player
    })

    case PLAYER_CREATED :
    const newPlayer = { ...payload }
    return [newPlayer].concat(state)

    case PLAYER_UPDATED :
    return state.map((player) => {
      if (player._id === payload._id) {
        return { ...payload }
      }
      return player
    })


    case PLAYERS_UPDATED :
    return state.map((player) => {
      if (player._id === payload.player._id) {
        return { ...payload.player, players: payload.players }
      }
      return player
    })


    case MOVE_PLAYERS :
    return state.map((player) => {
      if (player._id === payload.player._id) {
        return {...payload, village: payload.village }
      }
      return player
    })

    case PLAYER_REMOVED :
    return state.filter((player) => (player._id !== payload._id))

    default :
    return state

  }
}

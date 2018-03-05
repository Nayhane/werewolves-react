import { FETCHED_ONE_PLAYER, FETCHED_PLAYERS } from '../actions/games/fetch'
//import  MOVE_PLAYERS  from '../actions/games/move'
import {
  PLAYER_CREATED,
  PLAYER_REMOVED,
  PLAYER_UPDATED,
  PLAYERS_UPDATED,
  PLAYER_MESSAGE_UPDATED,
  PLAYER_MESSAGES_UPDATED
} from '../actions/games/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_PLAYERS :
      return [...payload]

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

      case PLAYER_MESSAGE_UPDATED :
        return state.map((player) => {
          if (player._id === payload._id) {
            return { ...payload }
          }
          return {...player}
        })

    case PLAYERS_UPDATED :
      return state.map((player) => {
        if (player._id === payload._id) {
          return { ...payload}
        }
        return player
      })

    case PLAYER_MESSAGES_UPDATED :
      return state.map((player) => {
        if (player._id === payload._id) {
          return { ...payload}
        }
        return player
      })

    case PLAYER_REMOVED :
      return state.filter((player) => (player._id !== payload._id))

    default :
      return state

  }

}

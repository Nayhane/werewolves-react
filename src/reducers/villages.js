import { FETCHED_ONE_VILLAGE, FETCHED_VILLAGES } from '../actions/games/fetch'
import {
  VILLAGE_CREATED,
  VILLAGE_REMOVED,
} from '../actions/games/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_VILLAGES :
      console.log([...payload])
      return [...payload]

    case FETCHED_ONE_VILLAGE :
      const villageIds = state.map(v => v._id)
      if (villageIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((village) => {
        if (village._id === payload._id) {
          return { ...payload }
        }
        return village
      })

    case VILLAGE_CREATED :
    const newVillage = { ...payload }
    return [newVillage].concat(state)


    case VILLAGE_REMOVED :
      return state.filter((village) => (village._id !== payload._id))

    default :
      return state

  }

}

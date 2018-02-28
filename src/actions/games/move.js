import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { PLAYERS_UPDATED } from './subscribe'

// export const MOVE_PLAYERS = 'MOVE_PLAYERS'

const api = new API()

export default (id, village) => {
console.log(id)
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.patch(`/players/${id}/moveplayers`, village)

      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: PLAYERS_UPDATED,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

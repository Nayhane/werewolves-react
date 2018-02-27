import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const MOVE_PLAYERS = 'MOVE_PLAYERS'

const api = new API()

export default (id, village) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
console.log(id, village)
    api.patch(`/players/${id}/moveplayers`, village)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: MOVE_PLAYERS,
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

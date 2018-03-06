import API from '../../api/client'
import { LOAD_ERROR, APP_LOADING } from '../loading'

export const PLAYER_REMOVED = 'PLAYER_REMOVED'

const api = new API()

export default  (playerId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })


    api.delete(`/players/${playerId}`)
    .then((result) => {
      dispatch({
        type: PLAYER_REMOVED,
        payload: result.body
      })
    })
    .catch((error) => {
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}

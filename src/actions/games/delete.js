import API from '../../api/client'
import {
  LOAD_ERROR,
} from '../loading'

export const PLAYER_REMOVED = 'PLAYER_REMOVED'

const api = new API()

export default  (id, player) => {
  return (dispatch) => {
    api.delete(`/players/${id}`, player)
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

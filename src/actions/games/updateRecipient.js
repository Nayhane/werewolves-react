import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { PLAYER_MESSAGES_UPDATED } from './subscribe'

const api = new API()

export default (recipientId, message) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/players/${recipientId}/receivemessage`, message)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: PLAYER_MESSAGES_UPDATED,
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
